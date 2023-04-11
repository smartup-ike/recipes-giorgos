import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, from, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Categories } from '../models/categories.model';
import { Item } from '../models/item.model';
import { ItemDetail } from '../models/item-detail.model';
import MenuOption from '../models/menuOption.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private menuUrl =
    'https://us-central1-smartup-hr-test-frontend.cloudfunctions.net/menu';
  private items =
    'https://us-central1-smartup-hr-test-frontend.cloudfunctions.net/categories/';
  private item =
    'https://us-central1-smartup-hr-test-frontend.cloudfunctions.net/items/';

  constructor(private db: AngularFireDatabase) {}

  getMenu(): Observable<any> {
    return this.db.list('menu_option').valueChanges();
  }

  getCategory(id: string): Observable<any> {
    return this.db.list<Item[]>(`item_keys/${id}`).valueChanges();
  }

  // getItem(id: string): Observable<ItemDetail> {
  //   return this.http.get<ItemDetail>(`${this.item}/${id}`);
  // }
}
