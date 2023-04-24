import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;

  date: Date | undefined;

  ngOnInit(): void {
    this.date = new Date(this.comment.timestamp);
  }
}
