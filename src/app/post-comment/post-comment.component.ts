import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
})
export class PostCommentComponent {
  constructor(private route: ActivatedRoute) {}

  postComment(e: Event) {
    this.route.params.subscribe(console.log);
  }
}
