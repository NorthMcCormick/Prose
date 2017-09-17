import { Component } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth/auth';

//Pages
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(public appCtrl: App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public authData: Auth) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.authData.getAuthenticated().subscribe((user) => {
        console.log('get auth trigger?');
        console.log(user);

        if(user) {
          this.appCtrl.getActiveNavs()[0].setRoot(HomePage);
          
        }else{
          //this.appCtrl.getActiveNavs()[0].setRoot(LandingPage);
          this.appCtrl.getRootNav().setRoot(LoginPage);
        }
        
        statusBar.styleLightContent();
        splashScreen.hide();
      });
    });
  }
}
