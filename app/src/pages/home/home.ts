import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

import { FirebaseListObservable } from "angularfire2/database";

import { ProductsServiceProvider } from '../../providers/products-service/products-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public products: FirebaseListObservable<any[]>;

  constructor(public nav: NavController, public authData: Auth, public productsService: ProductsServiceProvider) {
    this.authData = authData;
    productsService.getProducts().then((products: FirebaseListObservable<any[]>) => {
      this.products = products;
    });
  }

  view(product: any) {
    
  }

  logOut(){
    this.authData.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }
}
