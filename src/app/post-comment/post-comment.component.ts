import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
})
export class PostCommentComponent implements OnInit {
  constructor(private route: ActivatedRoute, private auth: AngularFireAuth) {}

  text: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  email: string = '';
  uid: string = '';

  commentForm = new FormGroup({
    text: this.text,
  });

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.email = user?.email!;
      this.uid = user?.uid!;
    });
  }

  postComment(e: Event) {
    console.log(
      `${this.email} and ${this.uid} and ${this.commentForm.value.text}`
    );
  }
}
