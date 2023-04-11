import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, from, of, switchMap } from 'rxjs';

import { Categories } from '../models/categories.model';
import { Items } from '../models/item.model';
import { ItemDetail } from '../models/item-detail.model';

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

  constructor(private http: HttpClient) {}

  getMenu(): Observable<Categories> {
    return this.http.get<Categories>(this.menuUrl);
  }

  getCategory(id: string): Observable<Items> {
    return this.http.get<Items>(`${this.items}/${id}`);
  }

  getItem(id: string): Observable<ItemDetail> {
    return this.http.get<ItemDetail>(`${this.item}/${id}`);
  }
}
