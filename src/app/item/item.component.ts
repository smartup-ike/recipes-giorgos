import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  isHidden = true;

  @Input() id: string = '';
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';
  url: string = '';

  setHidden(e: Event) {
    this.isHidden = !this.isHidden;
  }

  ngOnInit(): void {
    this.url = `https://firebasestorage.googleapis.com/v0/b/smartup-hr-test-frontend.appspot.com/o/${this.imageUrl}?alt=media`;
  }
}
