import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemSummary } from '../models/item-summary.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private id = new BehaviorSubject('Επιλεξε μενου');
  private path = new BehaviorSubject('');
  private item = new BehaviorSubject<ItemSummary>({
    id: '',
    title: '',
    image_path: '',
    description: '',
  });
  currentID = this.id.asObservable();
  currentPath = this.path.asObservable();
  currentItem = this.item.asObservable();

  constructor() {}

  changeID(id: string) {
    this.id.next(id);
  }

  changePath(path: string) {
    this.path.next(path);
  }

  changeItem(item: ItemSummary) {
    this.item.next(item);
  }
}
