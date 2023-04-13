import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ItemContent } from '../models/item-content.model';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { ItemLinks } from '../models/item-links.model';
import { ItemSummary } from '../models/item-summary.model';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  isRated = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private data: DataService
  ) {}
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

  ngOnInit(): void {
    const ratingStars = [document.querySelectorAll('.rating__star')];

    ratingStars[0].forEach((el) => {
      this.stars.push(el);
    });

    //get item summary
    this.subscription = this.data.currentItem.subscribe((item) => {
      //on refresh
      if (!item.id) {
        this.route.paramMap.subscribe((params) => {
          let id = params.get('id')!;
          this.api.getSummary(id).subscribe((summary) => {
            this.itemSummary = summary as ItemSummary;

            this.url = `https://firebasestorage.googleapis.com/v0/b/smartup-hr-test-frontend.appspot.com/o/${summary?.image_path}?alt=media`;
            this.data.changeID(summary?.title as string);
          });
        });
      } else {
        //when navigating with button
        this.itemSummary = item;

        this.url = `https://firebasestorage.googleapis.com/v0/b/smartup-hr-test-frontend.appspot.com/o/${item.image_path}?alt=media`;
        this.data.changeID(item.title);
      }
    });

    //get the rest of the data

    this.route.paramMap.subscribe((params) => {
      let id = params.get('id')!;
      this.api.getItemContent(id).subscribe((item) => {
        if (item) {
          this.itemContent.ingredients = item.ingredients;
          this.itemContent.instructions = item.instructions;
        }
      });
      this.api.getItemWebsiteUrl(id).subscribe((websiteUrl) => {
        if (websiteUrl) {
          this.itemLinks.websiteUrl = websiteUrl;
        }
      });

      this.api.getItemYoutubeUrl(id).subscribe((youtubeUrl) => {
        if (youtubeUrl) {
          this.itemLinks.youtubeUrl = youtubeUrl;
        }
      });

      this.api.getRating(id).subscribe((rating) => {
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
      });
    });
  }

  rateRecipe(e: Event) {
    let id: number = ((e.target as HTMLElement).id as unknown as number) - 1;
    const star = e.target as HTMLElement;
    const starClassActive = 'rating__star fas fa-star m-4 cursor-pointer';
    const starClassInactive = 'rating__star far fa-star m-4 cursor-pointer';
    const starsLength = this.stars.length;

    console.log(id);

    if (id) {
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
}
