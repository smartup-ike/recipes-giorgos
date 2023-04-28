import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';
import { Item } from '../models/item.model';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  isRated = false;
  imageLoaded = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private auth: AngularFireAuth,
    private data: DataService
  ) { }
  //get item from sibling comp


  itemRating = '';
  itemRatingRounded = 0;
  subscription?: Subscription;
  stars: Element[] = [];
  itemId = '';
  uid = '';

  item?: Item;


  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.uid = user?.uid!;
    });

    const ratingStars = [document.querySelectorAll('.rating__star')];

    ratingStars[0].forEach((el) => {
      this.stars.push(el);
    });

    const paramMap$ = this.route.paramMap;

    paramMap$.pipe(switchMap(params => {
      const id = params.get('id');
      if (!id) {
        return of();
      }

      return this.itemService.getItem(id);

    })).subscribe(item => {
      this.item = item;
      if (!item.url) this.imageLoaded = true;
    });




    this.subscription = paramMap$.pipe(switchMap(params => {
      const id = params.get('id');
      if (!id) {
        return of();
      }

      this.itemId = id;

      return this.api.getRating(id);
    })).subscribe((ratings) => {
      if (ratings) {
        this.itemRating = ratings?.rating;
        this.itemRatingRounded = Math.round(
          ratings?.rating as unknown as number
        );

        let id: number = Math.round(ratings?.rating as unknown as number);

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
    });
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

    this.api.updateItemRating(this.itemId, this.uid, rating);

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
    this.imageLoaded = true;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}