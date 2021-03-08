import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouteReuseStrategy} from '@angular/router'
import {IonicModule, IonicRouteStrategy} from '@ionic/angular'

import {SplashScreen} from '@ionic-native/splash-screen/ngx'
import {StatusBar} from '@ionic-native/status-bar/ngx'
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx'
import {Base64ToGallery} from '@ionic-native/base64-to-gallery/ngx'
import {SocialSharing} from '@ionic-native/social-sharing/ngx/'
import {NativeStorage} from '@ionic-native/native-storage/ngx'
import {Clipboard} from '@ionic-native/clipboard/ngx'
import {Market} from '@ionic-native/market/ngx'
import {ImagePicker} from '@ionic-native/image-picker/ngx'
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx'
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx'

import {CoreModule} from './core/core.module'
import {SharedModule} from './shared/shared.module'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HeaderComponent} from './ui/header/header.component'
import {DrawerComponent} from './ui/drawer/drawer.component'

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      DrawerComponent
   ],
   entryComponents: [],
   imports: [
      BrowserModule,
      IonicModule.forRoot(),
      CoreModule,
      SharedModule,
      AppRoutingModule
   ],
   providers: [
      {
         provide: RouteReuseStrategy,
         useClass: IonicRouteStrategy
      },
      SplashScreen,
      StatusBar,
      BarcodeScanner,
      Base64ToGallery,
      SocialSharing,
      NativeStorage,
      Clipboard,
      ImagePicker,
      Market,
      InAppBrowser,
      AndroidPermissions
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
