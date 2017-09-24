import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

import { ProductsServiceProvider } from '../../providers/products-service/products-service';
import { VersionsServiceProvider } from '../../providers/versions-service/versions-service';

/**
 * Generated class for the VersionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-version',
  templateUrl: 'version.html',
})
export class VersionPage {
  public version: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public versionsService: VersionsServiceProvider) {
    console.log(this.navParams.get('version'), this.navParams.get('product'));
    this.version = versionsService.getVersion(this.navParams.get('version'), this.navParams.get('product'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VersionPage');
  }

}
