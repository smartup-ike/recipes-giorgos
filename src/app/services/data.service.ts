import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemSummary } from '../models/item-summary.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private title = new BehaviorSubject('Επιλεξε μενου');
  private path = new BehaviorSubject('');
  private item = new BehaviorSubject<ItemSummary>({
    id: '',
    title: '',
    image_path: '',
    description: '',
  });
  currentTitle = this.title
  currentPath = this.path
  currentItem = this.item

  constructor() { }

  changeId(title: string) {
    this.title.next(title);
  }

  changePath(path: string) {
    this.path.next(path);
  }

  changeItem(item: ItemSummary) {
    this.item.next(item);
  }
}
