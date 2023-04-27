import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../models/comment.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  comments: Comment[] = [];

  ngOnInit(): void {
    const paramMap$ = this.route.paramMap;

    paramMap$.pipe(switchMap(params => {
      let id = params.get('id')!;
      return this.api.getComments(id)
    })).subscribe((comments) => {
      this.comments = comments;
    });;
  }
}
