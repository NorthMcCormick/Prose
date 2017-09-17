import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

@Injectable()
export class Auth {
  private currentUser: firebase.User;
  
  constructor(public fireAuth: AngularFireAuth) {
    fireAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }
  
  loginUser(email: string, password: string): any {
    console.log("Login User");

    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): any {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): any {
    return this.fireAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.fireAuth.auth.signOut();
  }

  getAuthenticated(): Observable<firebase.User> {
    return this.fireAuth.authState;
  }
}