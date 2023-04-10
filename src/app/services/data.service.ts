import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private id = new BehaviorSubject('Επιλεξε μενου');
  currentID = this.id.asObservable();

  constructor() {}

  changeID(id: string) {
    this.id.next(id);
  }
}
