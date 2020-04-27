import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
// import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
// import { environment } from "./../environments/environment";
import { IonicStorageModule } from "@ionic/storage";
import { ComponentsModule } from "./components/components.module";

import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { Values } from "./shared/values.class";
import { CacheModule } from "ionic-cache";
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { IonicImageLoader } from 'ionic-image-loader';
import { FormsModule } from '@angular/forms';
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { Crop } from "@ionic-native/crop/ngx";
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';




export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ComponentsModule,
    IonicStorageModule.forRoot(),
    CacheModule.forRoot({keyPrefix: 'restaurant-cache'}),
    IonicImageLoader.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WebView,
    Crop,
    Values,
    ImagePicker,
    OneSignal,
    Dialogs,
    QRScanner,
    // Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
