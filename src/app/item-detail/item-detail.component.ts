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
  itemSummary: ItemSummary | undefined;

  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.data.currentItem.subscribe((item) => {
      this.itemSummary = item;

      this.data.changeID(item.title);
    });

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
    });
  }
}
