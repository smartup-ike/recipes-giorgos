import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, of, switchMap } from 'rxjs';
import { ItemContent } from '../models/item-content.model';
import { ItemLinks } from '../models/item-links.model';
import { ItemSummary } from '../models/item-summary.model';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  isRated = false;
  imageLoaded = false
  imgPathExists = true

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private data: DataService,
    private functions: AngularFireFunctions,
    private database: AngularFireDatabase,
    private auth: AngularFireAuth
  ) { }
  //get item from sibling comp
  itemContent: ItemContent = {
    ingredients: [],
    instructions: [],
  };
  itemLinks: ItemLinks = {
    websiteUrl: '',
    youtubeUrl: '',
  };
  itemSummary: ItemSummary = {
    id: '',
    title: '',
  };

  itemRating = '';
  itemRatingRounded = 0;
  url = '';
  subscription: Subscription = new Subscription();
  stars: Element[] = [];
  itemID = '';
  uid = '';

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.uid = user?.uid!;
    });

    const ratingStars = [document.querySelectorAll('.rating__star')];

    ratingStars[0].forEach((el) => {
      this.stars.push(el);
    });

    //get item summary
    this.subscription = this.data.currentItem.subscribe((item) => {
      //on refresh
      if (!item.id) {
        const paramMap$ = this.route.paramMap;
        paramMap$.pipe(switchMap(params => {
          const id = params.get('id')!;

          return this.api.getSummary(id);
        })).subscribe(summary => {
          this.itemSummary = summary as ItemSummary

          if (summary?.image_path) {
            this.url = `https://firebasestorage.googleapis.com/v0/b/smartup-hr-test-frontend.appspot.com/o/${summary?.image_path}?alt=media`;
          }

          this.data.changeId(summary?.title as string);
        })
      } else {
        //when navigating with button
        this.itemSummary = item;

        if (item?.image_path) {
          this.url = `https://firebasestorage.googleapis.com/v0/b/smartup-hr-test-frontend.appspot.com/o/${item?.image_path}?alt=media`;
        } else {
          this.imgPathExists = false
        }
        this.data.changeId(item.title);
      }
    });

    //get the rest of the data



    const paramMap$ = this.route.paramMap;

    paramMap$.pipe(switchMap(params => {
      const id = params.get('id');
      if (!id) {
        return of([])
      }

      this.itemID = id;

      const getItemContent$ = this.api.getItemContent(id)
      const getItemWebsiteUrl$ = this.api.getItemWebsiteUrl(id)
      const getItemYoutubeUrl$ = this.api.getItemYoutubeUrl(id)
      const getRating$ = this.api.getRating(id)

      return combineLatest([getItemContent$, getItemWebsiteUrl$, getItemYoutubeUrl$, getRating$])

    })).subscribe(([item, websiteUrl, youtubeUrl, rating]) => {
      if (item) {
        this.itemContent.ingredients = item.ingredients;
        this.itemContent.instructions = item.instructions;
      }

      if (websiteUrl) {
        this.itemLinks.websiteUrl = websiteUrl;
      }

      if (youtubeUrl) {
        this.itemLinks.youtubeUrl = youtubeUrl;
      }

      if (rating) {
        this.itemRating = rating?.rating!;
        this.itemRatingRounded = Math.round(
          rating?.rating as unknown as number
        );

        let id: number = Math.round(rating?.rating as unknown as number);

        const starClassActive = 'rating__star fas fa-star m-4 cursor-pointer';
        const starClassInactive = 'rating__star far fa-star m-4 cursor-pointer';
        const starsLength = this.stars.length;

        this.stars.map((star) => {
          if (star.className === starClassInactive) {
            for (id; id > 0; --id) {
              this.stars[id - 1].className = starClassActive;
            }
          } else {
            for (id; id < starsLength && id > 0; ++id) {
              this.stars[id].className = starClassInactive;
            }
          }
        });
      }
    })

  }

  rateRecipe(e: Event) {
    //id for displaying stars
    let id: number = parseInt((e.target as HTMLElement).id) - 1;
    //rating for database
    let rating: number = parseInt((e.target as HTMLElement).id);
    const star = e.target as HTMLElement;
    const starClassActive = 'rating__star fas fa-star m-4 cursor-pointer';
    const starClassInactive = 'rating__star far fa-star m-4 cursor-pointer';
    const starsLength = this.stars.length;

    this.api.updateItemRating(this.itemID, this.uid, rating);

    if (id >= 0) {
      if (star.className === starClassInactive) {
        for (id; id >= 0; --id) {
          this.stars[id].className = starClassActive;
        }
      } else {
        let clickedID = id;
        for (id; id < starsLength; ++id) {
          if (id !== clickedID) {
            this.stars[id].className = starClassInactive;
          }
        }
      }
    }
  }

  logLoad(): void {
    this.imageLoaded = true
  }

}