import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';

@Injectable()
export class Auth {
  private currentUser: firebase.User;

  constructor(public fireAuth: AngularFireAuth, public fireDatabase: AngularFireDatabase) {
    fireAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }
  
  loginUser(email: string, password: string): any {
    console.log("Login User");

    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  getRoles() {
    return new Promise((resolve) => {
      var roles = this.fireDatabase.object(`/userRoles/${this.currentUser.uid}`).subscribe((data) => {
        resolve(data);
      });
    });
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