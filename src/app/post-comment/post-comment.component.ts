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
  ) {}

  text: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  email: string = '';
  uid: string = '';
  name: string = '';
  itemID: string = '';

  commentForm = new FormGroup({
    text: this.text,
  });

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.email = user?.email!;
      this.uid = user?.uid!;
      if (!user?.displayName) {
        this.name = 'anonymous';
      } else {
        this.name = user?.displayName;
      }
    });

    this.route.paramMap.subscribe((param) => {
      this.itemID = param.get('id')!;
    });
  }

  postComment(e: Event) {
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
      reviewID: this.database.createPushId(),
      itemID: this.itemID,
    };

    const comment$ = this.functions.httpsCallable('onPostComment');
    let data = comment$(handlerData);
    data.subscribe(console.log);

    console.log(
      `${this.email} and ${this.uid} and ${this.commentForm.value.text}`
    );
  }
}
