import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'

import {AlertService, HistoryService, LanguagesService, OptionsService, UiService} from '../../core/services'
import {Options} from '../../core/models'

@Component({
   selector: 'app-drawer',
   templateUrl: './drawer.component.html',
   styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy {

   public options: Options = {
      isDarkTheme: false,
      frontalCamera: false,
      showTorch: false,
      beep: false
   }

   public langAlertOptions = {
      cssClass: 'langAlert',
      header: ''
   }

   private subOptions$: Subscription

   constructor(
      public uiService: UiService,
      public languagesService: LanguagesService,
      private optionsService: OptionsService,
      private historyService: HistoryService,
      private alertService: AlertService
   ) {
   }

   ngOnInit() {
      this.subOptions$ = this.optionsService.options$.subscribe((res: Options) => {
         this.options = {...res}
      })
   }

   ngOnDestroy() {
      this.subOptions$?.unsubscribe()
   }

   public closeDrawerMenu() {
      this.uiService.closeDrawer()
   }

   public async changeTheme() {
      this.subOptions$?.unsubscribe()
      await this.optionsService.changeAppTheme()
   }

   public frontalCamera() {
      this.subOptions$?.unsubscribe()
      this.optionsService.saveOptions(this.options)
   }

   public showTorch() {
      this.subOptions$?.unsubscribe()
      this.optionsService.saveOptions(this.options)
   }

   public beep() {
      this.subOptions$?.unsubscribe()
      this.optionsService.saveOptions(this.options)
   }

   public async clearHistory() {
      const data = await this.alertService.presentAlert(
         this.languagesService.key.alerts.clearHistory.title,
         this.languagesService.key.alerts.clearHistory.left,
         this.languagesService.key.alerts.clearHistory.right,
      )

      if(data?.data) {
         this.historyService.clearHistory()
      }
   }

   public selectLang(event) {
      if (event?.detail?.value) {
         this.languagesService.setCurrentLanguage(event.detail.value)
      }
   }

   openAlert() {
      this.langAlertOptions.header = this.languagesService.key.drawer.language
   }
}
