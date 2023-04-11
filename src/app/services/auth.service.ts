import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(private auth: AngularFireAuth) {}
  list$: any;

  ngOnInit(): void {}

  read() {
    console.log(this.list$);
  }

  public async signIn(userData: any) {
    const userCred = await this.auth.signInWithEmailAndPassword(
      userData.email,
      userData.password
    );
  }
}
