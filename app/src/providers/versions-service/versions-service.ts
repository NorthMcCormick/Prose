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
export class VersionsServiceProvider {

  constructor(public authData: Auth, public fireDatabase: AngularFireDatabase) {
    console.log('Hello VersionsServiceProvider Provider');
	}
	
	addVersion(versionData: any) {
		
	}

  getVersions(productKey) {
		return this.fireDatabase.list(`versions/${productKey}`);
  }

  getVersion(productKey: string, versionKey: string) {
    return this.fireDatabase.object(`versions/${productKey}/${versionKey}`);
  }
}
