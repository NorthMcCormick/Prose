import { Injectable } from '@angular/core';


import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Auth } from '../auth/auth';

import { FileItem } from '../../directives/ng-drop-files/file-item';

import * as firebase from 'firebase';
import * as _ from 'lodash';

/*
  Generated class for the UploadServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UploadServiceProvider {
  private uploadTask: firebase.storage.UploadTask;
  public uploads: FirebaseListObservable<any[]>;

  constructor(public authData: Auth, private db: AngularFireDatabase) {
    console.log('Hello UploadServiceProvider Provider');
  }

  uploadToFirebase(directory: string, files: Array<FileItem[]>) {
    console.log('Starting upload');
    console.log(files);

    let storageRef = firebase.storage().ref();

    _.each(files, (item: FileItem) => {

      item.isUploading = true;
      
      storageRef.child(`${directory}/${item.file.name}`).put(item.file).then(() => {
        console.log(`Uploaded ${item.file.name}`);
      });
      
      /*uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
        (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => {},
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          item.isUploading = false;
          this.saveImage({ name: item.file.name, url: item.url });
        }
      );*/
    
    });

 }

 private saveImage(directory: string, image: any) {
   this.db.list(`/${directory}/${image}`).push(image);
 }

}
