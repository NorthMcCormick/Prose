import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

import { ProductsServiceProvider } from '../../providers/products-service/products-service';
import { VersionsServiceProvider } from '../../providers/versions-service/versions-service';
import { UploadServiceProvider } from '../../providers/upload-service/upload-service';

import { FileItem } from '../../directives/ng-drop-files/file-item';

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

  public isDropZoneOver:boolean = false;
  public isEnabledUpload: boolean = true;
  public files: Array<FileItem[]> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public versionsService: VersionsServiceProvider, public uploadService: UploadServiceProvider) {
    console.log(this.navParams.get('version'), this.navParams.get('product'));
    this.version = versionsService.getVersion(this.navParams.get('version'), this.navParams.get('product'));
  }
  
  public fileOverDropZone(e:any):void {
    this.isDropZoneOver = e;
  }

  uploadToFirebase() {
    console.log('click upload');
    this.isEnabledUpload = false;
    this.uploadService.uploadToFirebase(`po/${this.navParams.get('product')}/${this.navParams.get('version')}`, this.files);
  }

 clearFiles() {
  this.files = [];
  this.isEnabledUpload = true;
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VersionPage');
  }

}
