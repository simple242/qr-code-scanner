import {Component, OnDestroy, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {
   AlertService,
   BrowserService,
   HistoryService,
   LanguagesService,
   MarketService,
   OptionsService,
   QrCodeService,
   SmsService,
   ToastService,
   UiService
} from '../../core/services'
import {APP_LINK, EMAIL_PATTERN, TOGGLE_TIMEOUT, URL_PATTERN} from 'src/app/core/constants'
import {QrCodeType, Sms} from '../../core/models'
import {Subscription} from 'rxjs'

@Component({
   selector: 'app-main',
   templateUrl: './main.component.html',
   styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

   public scannedCode: string
   public elementType: QrCodeType = 'canvas'
   public qrData: string = ''

   public emailLink: string
   public url: string
   public sms: Sms = {
      number: '',
      text: ''
   }

   private scanToggle: boolean = true
   private loadGalleryToggle: boolean = true
   private copyToggle: boolean = true
   private sharingAppToggle: boolean = true
   private sharingTextToggle: boolean = true
   private sharingToggle: boolean = true
   private processQrCodeToggle: boolean = true
   private subIsChangeLang$: Subscription

   constructor(
      private router: Router,
      private qrCodeService: QrCodeService,
      private marketService: MarketService,
      private historyService: HistoryService,
      private uiService: UiService,
      private alertService: AlertService,
      private toastService: ToastService,
      private smsService: SmsService,
      private browserService: BrowserService,
      public optionsService: OptionsService,
      public languagesService: LanguagesService
   ) {
   }

   ngOnInit() {
      this.subIsChangeLang$ = this.languagesService.isLangChange$.subscribe(() => {
         this.uiService.headerTitle$.next(this.languagesService.key.header.main)
      })
   }

   ngOnDestroy() {
      this.subIsChangeLang$?.unsubscribe()
   }

   ionViewWillEnter() {
      this.uiService.headerTitle$.next(this.languagesService.key.header.main)
      this.uiService.isMainPage$.next(true)
   }

   ionViewWillLeave() {
      this.uiService.isMainPage$.next(false)
   }

   private async checkCodeValue(code: string) {

      this.emailLink = ''
      this.url = ''
      this.sms = {
         number: '',
         text: ''
      }

      if (code.startsWith('mailto:')) {
         this.emailLink = code
         return
      } else {
         this.emailLink = ''
      }

      if (EMAIL_PATTERN.test(code)) {
         this.emailLink = code
         return
      } else {
         this.emailLink = ''
      }

      if (code.startsWith('smsto:')) {
         const regExpSms = new RegExp(`smsto:([^<>]*):`)
         const number = code.match(regExpSms)[1]

         const lastIdx = code.lastIndexOf(':') + 1
         const text = code.slice(lastIdx, code.length)
         this.sms = {number, text}
         return
      } else {
         this.sms = {
            number: '',
            text: ''
         }
      }

      if (URL_PATTERN.test(code)) {
         this.url = code
         return
      } else {
         this.url = ''
      }
   }

   public async scanCode() {
      try {
         if (!this.scanToggle) return
         this.scanToggle = false

         const codeResult = await this.qrCodeService.scanQrCode()
         if (codeResult) {
            this.scannedCode = codeResult
            this.qrData = codeResult

            this.checkCodeValue(codeResult)

            await this.historyService.pushHistory({
               type: 2,
               data: codeResult
            })
         } else {
            this.scannedCode = ''
            this.qrData = ''
         }

         const timeout = setTimeout(() => {
            this.scanToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         console.error(e)
         this.scanToggle = true
      }
   }

   public async toCreate() {
      await this.router.navigate(['create'])
   }

   public async toHistory() {
      await this.router.navigate(['history'])
   }

   public async loadImg() {
      try {
         if (!this.loadGalleryToggle) return
         this.loadGalleryToggle = false

         const codeResult = await this.qrCodeService.loadQrCodeFromGallery()
         if (codeResult) {
            this.scannedCode = codeResult
            this.qrData = codeResult

            this.checkCodeValue(codeResult)

            await this.historyService.pushHistory({
               type: 3,
               data: codeResult
            })
         } else {
            this.scannedCode = ''
            this.qrData = ''
         }

         const timeout = setTimeout(() => {
            this.loadGalleryToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         console.error(e)
         this.loadGalleryToggle = true
      }
   }

   public async copyCodeResult() {
      try {
         if (!this.copyToggle) return
         this.copyToggle = false

         await this.qrCodeService.copyQrCodeToClipboard(this.scannedCode)

         const timeout = setTimeout(() => {
            this.copyToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         console.error(e)
         this.copyToggle = true
      }
   }

   public async sharingCodeResult() {
      try {
         if (!this.sharingTextToggle) return
         this.sharingTextToggle = false

         await this.qrCodeService.sharingText(this.scannedCode)

         const timeout = setTimeout(() => {
            this.sharingTextToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         console.error(e)
         this.sharingTextToggle = true
      }
   }

   public async sharingApp() {
      try {
         if (!this.sharingAppToggle) return
         this.sharingAppToggle = false

         await this.qrCodeService.sharingText(APP_LINK)

         const timeout = setTimeout(() => {
            this.sharingAppToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         console.error(e)
         this.sharingAppToggle = true
      }
   }

   public async openMarket() {
      await this.marketService.openAppInMarket()
   }

   public async download() {
      const canvas = <HTMLCanvasElement>document.querySelector('canvas')
      await this.qrCodeService.downloadQrCode(canvas)
   }

   public async sharing() {
      try {
         if (!this.sharingToggle) return
         this.sharingToggle = false

         const canvas = <HTMLCanvasElement>document.querySelector('canvas')
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

   public async closeCode() {
      const data = await this.alertService.presentAlert(
         this.languagesService.key.alerts.close.title,
         this.languagesService.key.alerts.close.left,
         this.languagesService.key.alerts.close.right
      )

      if (data?.data) {
         this.scannedCode = ''
         this.qrData = ''
      }
   }

   public openDrawer() {
      this.uiService.showDrawer()
   }

   public async openEmailClient() {
      try {
         if (!this.processQrCodeToggle) return
         this.processQrCodeToggle = false

         if (this.emailLink.startsWith('mailto:')) {
            window.location.href = this.emailLink
         } else {
            window.location.href = `mailto:${this.emailLink}`
         }

         const timeout = setTimeout(() => {
            this.processQrCodeToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         await this.toastService.alertDanger(this.languagesService.key.toasts.unToEmail)
         this.processQrCodeToggle = true
      }
   }

   public sendSms() {
      if (!this.processQrCodeToggle) return
      this.processQrCodeToggle = false

      this.smsService.sendSms(this.sms)

      const timeout = setTimeout(() => {
         this.processQrCodeToggle = true
         clearTimeout(timeout)
      }, TOGGLE_TIMEOUT)
   }

   public openLink() {
      if (!this.processQrCodeToggle) return
      this.processQrCodeToggle = false

      this.browserService.openLinkInBrowser(this.url)

      const timeout = setTimeout(() => {
         this.processQrCodeToggle = true
         clearTimeout(timeout)
      }, TOGGLE_TIMEOUT)
   }
}
