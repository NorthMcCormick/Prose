import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Auth } from '../auth/auth';
/*
  Generated class for the ProductsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsServiceProvider {

  constructor(public authData: Auth, public fireDatabase: AngularFireDatabase) {
    console.log('Hello ProductsServiceProvider Provider');
  }

  getProducts() {
    return new Promise((resolve) => {
      this.authData.getRoles().then((roles: any) => {
        /**
         * If the user is an admin we want to show all the products, if they are not
         * we will want to check their roles to load the appropriate product list
         */
        if(roles.admin === true) {
          resolve(this.fireDatabase.list('products'));
        }else{
          resolve(this.fireDatabase.list(`userProducts/${this.authData.fireAuth.auth.currentUser.uid}`));
        }
      });
    });
  }

  getProduct(key: string) {
    return this.fireDatabase.object(`products/${key}`);
  }
}
