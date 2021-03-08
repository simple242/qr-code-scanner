import {Component} from '@angular/core'
import {Platform} from '@ionic/angular'
import {SplashScreen} from '@ionic-native/splash-screen/ngx'
import {StatusBar} from '@ionic-native/status-bar/ngx'

import {HistoryService, LanguagesService, OptionsService} from './core/services'
import {SPLASH_SCREEN_TIMEOUT} from './core/constants'

@Component({
   selector: 'app-root',
   templateUrl: 'app.component.html',
   styleUrls: ['app.component.scss']
})
export class AppComponent {
   constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private historyService: HistoryService,
      private optionsService: OptionsService,
      private languagesService: LanguagesService
   ) {
      this.initializeApp()
   }

   private async initializeApp() {
      try {
         await this.platform.ready()
         this.statusBar.hide()

         const timeout = setTimeout(() => {
            this.splashScreen.hide()

            clearTimeout(timeout)
         }, SPLASH_SCREEN_TIMEOUT)

         await this.languagesService.checkLanguage()
         await this.historyService.loadHistory()
         await this.optionsService.loadOptions()
         await this.optionsService.checkTheme()
      } catch (e) {
         console.error(e)
      }
   }
}
