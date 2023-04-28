import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../models/comment.model';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  constructor(private api: ApiService, private route: ActivatedRoute) { }
  subscription?: Subscription;
  comments: Comment[] = [];

  ngOnInit(): void {
    const paramMap$ = this.route.paramMap;

    this.subscription = paramMap$.pipe(switchMap(params => {
      let id = params.get('id')!;
      return this.api.getComments(id);
    })).subscribe((comments) => {
      this.comments = comments;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
