import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemSummary } from '../models/item-summary.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private title = new BehaviorSubject('Επίλεξε μενού');
  private path = new BehaviorSubject('');

  currentTitle = this.title;

  constructor() { }

  changeTitle(title: string) {
    this.title.next(title);
  }
}
