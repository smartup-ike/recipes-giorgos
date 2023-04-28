import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ApiService } from './api.service';
import { Item } from '../models/item.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private api: ApiService, private data: DataService) { }

  getItem(id: string): Observable<Item> {

    const itemContent$ = this.api.getItemContent(id);
    const itemWebsiteUrl$ = this.api.getItemWebsiteUrl(id);
    const itemYoutubeUrl$ = this.api.getItemYoutubeUrl(id);
    const summary$ = this.api.getSummary(id);

    return combineLatest([itemContent$, itemWebsiteUrl$, itemYoutubeUrl$, summary$]).pipe(map(([itemContent, websiteUrl, youtubeUrl, summary]) => {
      const item: Item = {
        ingredients: [],
        instructions: [],
        websiteUrl: '',
        youtubeUrl: '',
        id: '',
        url: '',
        title: '',
        description: ''
      };


      if (itemContent) {
        item.ingredients = itemContent.ingredients;
        item.instructions = itemContent.instructions;
      }

      if (websiteUrl) {
        item.websiteUrl = websiteUrl;
      }

      if (youtubeUrl) {
        item.youtubeUrl = youtubeUrl;
      }

      if (summary) {
        item.description = summary.description;
        item.id = summary.id;

        item.title = summary.title;

        if (summary.image_path) {
          item.url = `https://firebasestorage.googleapis.com/v0/b/smartup-hr-test-frontend.appspot.com/o/${summary.image_path}?alt=media`;
        }
      }

      return item;
    }
    ));

  }
}
