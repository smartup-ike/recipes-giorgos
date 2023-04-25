import { Component, Input, OnInit } from '@angular/core';
import { ItemSummary } from '../models/item-summary.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  constructor(private data: DataService) { }

  isHidden = true;
  imagesLoaded = false;

  @Input() item!: ItemSummary;
  url: string = '';


  setHidden(e: Event) {
    this.isHidden = !this.isHidden;
  }

  changeItem(item: ItemSummary) {
    this.data.changeItem(item);
  }

  ngOnInit(): void {
    if (this.item.image_path) {
      this.url = `https://firebasestorage.googleapis.com/v0/b/smartup-hr-test-frontend.appspot.com/o/${this.item.image_path}?alt=media`;

    } else {
      this.imagesLoaded = true;
    }
  }

  logLoad(): void {
    this.imagesLoaded = true;
  }
}
