import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() text = '';
  @Input() email = '';
  @Input() imageUrl = '';
  @Input() name = '';
  @Input() authorUid = '';
  @Input() timestamp = 0;
  @Input() id = '';
  date: Date | undefined;

  ngOnInit(): void {
    this.date = new Date(this.timestamp);
  }
}
