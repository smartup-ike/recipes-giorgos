import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rate-button',
  templateUrl: './rate-button.component.html',
  styleUrls: ['./rate-button.component.css'],
})
export class RateButtonComponent {
  @Input() number = 0;
}
