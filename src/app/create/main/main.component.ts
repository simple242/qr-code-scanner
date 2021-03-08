import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {Platform} from '@ionic/angular'

import {
   TYPE_EMAIL,
   TYPE_EVENT,
   TYPE_ME,
   TYPE_PHONE,
   TYPE_SMS,
   TYPE_TEXT,
   TYPE_URL,
   TYPE_WIFI
} from '../../core/constants'
import {LanguagesService, OptionsService, UiService} from '../../core/services'

@Component({
   selector: 'app-main',
   templateUrl: './main.component.html',
   styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

   constructor(
      private router: Router,
      private uiService: UiService,
      private platform: Platform,
      public optionsService: OptionsService,
      public languagesService: LanguagesService
   ) {
      this.platform.backButton.subscribeWithPriority(10, () => {
         this.router.navigate(['home'])
      })
   }

   ngOnInit() {
   }

   ionViewWillEnter() {
      this.uiService.headerTitle$.next(this.languagesService.key.header.create)
   }

   public async toGenerate(type: string) {
      switch (type) {
         case TYPE_URL:
            await this.router.navigate(['create/generate/', TYPE_URL])
            break
         case TYPE_EMAIL:
            await this.router.navigate(['create/generate/', TYPE_EMAIL])
            break
         case TYPE_TEXT:
            await this.router.navigate(['create/generate/', TYPE_TEXT])
            break
         case TYPE_PHONE:
            await this.router.navigate(['create/generate/', TYPE_PHONE])
            break
         case TYPE_WIFI:
            await this.router.navigate(['create/generate/', TYPE_WIFI])
            break
         case TYPE_SMS:
            await this.router.navigate(['create/generate/', TYPE_SMS])
            break
         case TYPE_EVENT:
            await this.router.navigate(['create/generate/', TYPE_EVENT])
            break
         case TYPE_ME:
            await this.router.navigate(['create/generate/', TYPE_ME])
            break
         default:
            console.error('Unknown type!')
      }
   }
}
