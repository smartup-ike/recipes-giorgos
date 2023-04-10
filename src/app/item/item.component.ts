import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  isHidden = true;

  @Input() id: string = '';
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';

  setHidden(e: Event) {
    this.isHidden = !this.isHidden;
  }
}
