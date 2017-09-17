import { BrowserModule } from '@angular/platform-browser';

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ForgotPage } from '../pages/forgot/forgot';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ConfigServiceProvider } from '../providers/config-service/config-service';

// add your info here
export const firebaseConfig = {
  apiKey: "AIzaSyAbD19sI5Xz_jKjEMCQhjuYXVPrdn3YEsY",
  authDomain: "codelab-22299.firebaseapp.com",
  databaseURL: "https://codelab-22299.firebaseio.com",
  projectId: "codelab-22299",
  storageBucket: "codelab-22299.appspot.com",
  messagingSenderId: "141181591031"
};


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ForgotPage,
    RegisterPage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ForgotPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth,
    ConfigServiceProvider,
    {
      provide: APP_INITIALIZER, 
      useFactory: (config: ConfigServiceProvider) => () => config.load(), 
      deps: [ConfigServiceProvider], 
      multi: true
    }
  ]
})
export class AppModule { }
