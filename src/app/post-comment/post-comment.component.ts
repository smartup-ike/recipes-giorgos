import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timestamp } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
})
export class PostCommentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    private functions: AngularFireFunctions,
    private database: AngularFireDatabase
  ) { }

  text: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  email: string = '';
  uid: string = '';
  name: string = '';
  itemId: string = '';

  isLoading = false;
  isError = false;
  isSuccess = false;
  errorText = '';
  loadingText = 'Loading...';
  successText = 'Review Posted!';

  commentForm = new FormGroup({
    text: this.text,
  });

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.email = user.email ?? 'anonymous';
        this.uid = user.uid;
        this.name = user.displayName ?? 'anonymous';
      }
    });

    this.route.paramMap.subscribe((param) => {
      this.itemId = param.get('id')!;
    });
  }

  postComment(e: Event) {
    this.isLoading = true;
    this.isError = false;
    this.isSuccess = false;
    const imageUrl =
      'https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png';

    const review = {
      author: {
        email: this.email,
        imageUrl: imageUrl,
        name: this.name,
        uid: this.uid,
      },
      authorUid: this.uid,
      text: this.commentForm.value.text,
      timestamp: new Date().getTime(),
    };

    const handlerData = {
      review: review,
      reviewId: this.database.createPushId(),
      itemId: this.itemId,
    };

    const comment$ = this.functions.httpsCallable('onPostComment');
    let data = comment$(handlerData);
    data.subscribe((res) => {
      if (res?.error) {
        this.isError = true;
        this.isLoading = false;
        this.errorText = res.error;
        return;
      }

      this.isLoading = false;
      this.isSuccess = true;
    });
  }
}
