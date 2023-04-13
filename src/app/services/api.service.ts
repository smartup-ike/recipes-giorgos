import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MenuOption } from '../models/menuOption.model';
import { OptionKeys } from '../models/option-keys.mode';
import { ItemSummary } from '../models/item-summary.model';
import { ItemContent } from '../models/item-content.model';
import { Comment } from '../models/comment.model';
import { Ratings } from '../models/ratings.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: AngularFireDatabase) {}

  getMenuOptions(): Observable<MenuOption[]> {
    return this.db.list<MenuOption>('menu_options').valueChanges();
  }

  getOptionKeys(path: string): Observable<OptionKeys | null> {
    return this.db.object<OptionKeys>(path).valueChanges();
  }

  getSummary(id: string): Observable<ItemSummary | null> {
    return this.db.object<ItemSummary>(`item_summaries/${id}`).valueChanges();
  }

  getItemContent(id: string): Observable<ItemContent | null> {
    return this.db.object<ItemContent>(`item_contents/${id}`).valueChanges();
  }

  getItemWebsiteUrl(id: string): Observable<string | null> {
    return this.db
      .object<string>(`item_external_links/website_urls/${id}`)
      .valueChanges();
  }

  getItemYoutubeUrl(id: string): Observable<string | null> {
    return this.db
      .object<string>(`item_external_links/youtube_urls/${id}`)
      .valueChanges();
  }

  getComments(id: string): Observable<Comment[]> {
    return this.db.list<Comment>(`item_reviews/${id}`).valueChanges();
  }

  getRating(id: string): Observable<Ratings | null> {
    return this.db
      .object<Ratings>(`item_ratings/${id}/averageRatingData`)
      .valueChanges();
  }
}
