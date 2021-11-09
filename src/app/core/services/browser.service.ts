import {Injectable} from '@angular/core'
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx'

import {ToastService} from './toast.service'
import {LanguagesService} from './languages.service'

@Injectable()
export class BrowserService {

   constructor(
      private toastService: ToastService,
      private languagesService: LanguagesService,
      private iab: InAppBrowser
   ) {
   }

   public async openLinkInBrowser(url: string) {
      try {
         if (url.includes('http://') || url.includes('https://')) {
            const browser = this.iab.create(url, '_system')
            browser.show()
         } else {
            url = `http://${url}`
            const browser = this.iab.create(url, '_system')
            browser.show()
         }
      } catch (e) {
         console.error(e)
         await this.toastService.alertDanger(this.languagesService.key.toasts.unOpen)
      }
   }
}
