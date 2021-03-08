import {Component, OnInit} from '@angular/core'

import {
   AlertService,
   HistoryService,
   LanguagesService,
   OptionsService,
   QrCodeService,
   UiService
} from 'src/app/core/services'
import {History} from '../../core/models'
import {TOGGLE_TIMEOUT} from '../../core/constants'

@Component({
   selector: 'app-main',
   templateUrl: './main.component.html',
   styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

   public historyItems: History[] = []
   public isShowNoData: boolean = false

   private downloadToggle: boolean = true
   private sharingToggle: boolean = true
   private copyToggle: boolean = true
   private sharingTextToggle: boolean = true

   constructor(
      private historyService: HistoryService,
      private uiService: UiService,
      private qrCodeService: QrCodeService,
      private alertService: AlertService,
      public optionsService: OptionsService,
      public languagesService: LanguagesService
   ) {
   }

   ngOnInit() {
   }

   ionViewWillEnter() {
      this.historyItems = [...this.historyService.historyArray]
      this.uiService.headerTitle$.next(this.languagesService.key.header.history)
   }

   public search(event) {
      const text = event?.target?.value?.trim().toLowerCase()

      this.isShowNoData = true

      this.historyItems.forEach(el => {
         if (el.data.toLowerCase().includes(text)) {
            el.isHide = false
            this.isShowNoData = false
         } else {
            el.isHide = true
         }
      })
   }

   public async download(item: History) {
      try {
         if (!this.downloadToggle) return
         this.downloadToggle = false

         const canvas = <HTMLCanvasElement>document.querySelector(`#h${item.id} canvas`)
         await this.qrCodeService.downloadQrCode(canvas)

         const timeout = setTimeout(() => {
            this.downloadToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         console.error(e)
         this.downloadToggle = true
      }
   }

   public async sharing(item: History) {
      try {
         if (!this.sharingToggle) return
         this.sharingToggle = false

         const canvas = <HTMLCanvasElement>document.querySelector(`#h${item.id} canvas`)
         await this.qrCodeService.sharingQrCode(canvas)

         const timeout = setTimeout(() => {
            this.sharingToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         console.error(e)
         this.sharingToggle = true
      }
   }

   public async removeItem(item: History) {
      const data = await this.alertService.presentAlert(
         this.languagesService.key.alerts.remove.title,
         this.languagesService.key.alerts.remove.left,
         this.languagesService.key.alerts.remove.right
      )

      if (data?.data) {
         await this.historyService.removeHistoryItem(item.id)
         this.historyItems = this.historyItems.filter(h => h.id !== item.id)
      }
   }

   public async copyCodeResult(item: History) {
      try {
         if (!this.copyToggle) return
         this.copyToggle = false

         await this.qrCodeService.copyQrCodeToClipboard(item.data)

         const timeout = setTimeout(() => {
            this.copyToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         console.error(e)
         this.copyToggle = true
      }
   }

   public async sharingCodeResult(item: History) {
      try {
         if (!this.sharingTextToggle) return
         this.sharingTextToggle = false

         await this.qrCodeService.sharingText(item.data)

         const timeout = setTimeout(() => {
            this.sharingTextToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         console.error(e)
         this.sharingTextToggle = true
      }
   }
}
