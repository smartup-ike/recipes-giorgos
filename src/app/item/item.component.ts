import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ItemSummary } from '../models/item-summary.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  constructor(private data: DataService) {}

  isHidden = true;

  @Input() id: string = '';
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';
  @Input() item: ItemSummary | undefined;
  url: string = '';

  setHidden(e: Event) {
    this.isHidden = !this.isHidden;
  }

  changeItem(item: ItemSummary) {
    this.data.changeItem(item);
  }

  ngOnInit(): void {
    this.url = `https://firebasestorage.googleapis.com/v0/b/smartup-hr-test-frontend.appspot.com/o/${this.imageUrl}?alt=media`;
  }
}
