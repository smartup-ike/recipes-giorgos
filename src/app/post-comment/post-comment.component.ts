import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  review = {
    author: {
      email: '',
      imageUrl: '',
      name: '',
      uid: '',
    },
    authorUid: '',
    text: '',
    timestamp: new Date().getTime(),
  };

  handlerData = {
    review: this.review,
    reviewId: this.database.createPushId(),
    itemId: '',
  };

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
      if (!user) {
        return;
      }

      this.review.author.email = user.email ?? 'anonymous';
      this.review.author.uid = user.uid;
      this.review.authorUid = user.uid;
      this.review.author.name = user.displayName ?? 'anonymous';
    });

    this.route.paramMap.subscribe((param) => {
      this.handlerData.itemId = param.get('id')!;
    });
  }

  postComment(e: Event) {
    this.isLoading = true;
    this.isError = false;
    this.isSuccess = false;
    const imageUrl =
      'https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png';

    this.review.author.imageUrl = imageUrl;
    this.review.text = this.commentForm.value.text;

    const comment$ = this.functions.httpsCallable('onPostComment');
    let data = comment$(this.handlerData);
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
