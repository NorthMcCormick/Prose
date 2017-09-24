import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

import { ProductsServiceProvider } from '../../providers/products-service/products-service';
import { VersionsServiceProvider } from '../../providers/versions-service/versions-service';

import { VersionPage } from '../version/version';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  public product: FirebaseObjectObservable<any>;
  public versions: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productsService: ProductsServiceProvider, public versionsService: VersionsServiceProvider) {
    this.product = productsService.getProduct(navParams.get('product').$key);
    this.versions = versionsService.getVersions(navParams.get('product').$key);
  }

  gotoVersion(version: any) {
    this.navCtrl.push(VersionPage, {
      version: version.$key,
      product: this.navParams.get('product').$key
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

}
