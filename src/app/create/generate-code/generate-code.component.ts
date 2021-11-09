import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {FormControl, FormGroup, Validators} from '@angular/forms'

import {GenerateType, QrCodeType} from 'src/app/core/models'
import {HistoryService, LanguagesService, QrCodeService, UiService} from '../../core/services'
import {
   DATE_MAX_LEN,
   DATE_MIN_LEN,
   DESCRIPTION_MAX_LEN,
   DESCRIPTION_MIN_LEN,
   EMAIL_MAX_LEN,
   EMAIL_MIN_LEN,
   LOCATION_MAX_LEN,
   LOCATION_MIN_LEN,
   PHONE_MAX_LEN,
   PHONE_MIN_LEN,
   PHONE_PATTERN,
   SMS_MAX_LEN,
   SMS_MIN_LEN,
   SSID_MAX_LEN,
   SSID_MIN_LEN,
   TEXT_MAX_LEN,
   TEXT_MIN_LEN,
   TITLE_MAX_LEN,
   TITLE_MIN_LEN,
   TOGGLE_TIMEOUT,
   TYPE_EMAIL,
   TYPE_EVENT,
   TYPE_ME,
   TYPE_PHONE,
   TYPE_SMS,
   TYPE_TEXT,
   TYPE_URL,
   TYPE_WIFI,
   URL_MAX_LEN,
   URL_MIN_LEN,
   URL_PATTERN,
   WIFI_PASS_MAX_LEN,
   WIFI_PASS_MIN_LEN,
   FN_MIN_LEN,
   FN_MAX_LEN,
   ORGANIZATION_MIN_LEN,
   ORGANIZATION_MAX_LEN, ADDRESS_MIN_LEN, ADDRESS_MAX_LEN, NOTES_MIN_LEN, NOTES_MAX_LEN
} from '../../core/constants'

@Component({
   selector: 'app-generate-code',
   templateUrl: './generate-code.component.html',
   styleUrls: ['./generate-code.component.scss']
})
export class GenerateCodeComponent implements OnInit {

   public type: GenerateType
   public placeholder: string = ''
   public qrData: string = ''
   public elementType: QrCodeType = 'canvas'
   public inputType: string = 'text'
   public radioGroupValue: string = 'WPA'

   public formSms: FormGroup
   public formWifi: FormGroup
   public formEvent: FormGroup
   public formMe: FormGroup

   public activeFormControl: FormControl
   public formControls = {
      email: new FormControl(this.qrData, [
         Validators.required,
         Validators.email,
         Validators.minLength(EMAIL_MIN_LEN),
         Validators.maxLength(EMAIL_MAX_LEN)
      ]),
      text: new FormControl(this.qrData, [
         Validators.required,
         Validators.minLength(TEXT_MIN_LEN),
         Validators.maxLength(TEXT_MAX_LEN)
      ]),
      url: new FormControl(this.qrData, [
         Validators.required,
         Validators.minLength(URL_MIN_LEN),
         Validators.maxLength(URL_MAX_LEN),
         Validators.pattern(URL_PATTERN)
      ]),
      phone: new FormControl(this.qrData, [
         Validators.required,
         Validators.minLength(PHONE_MIN_LEN),
         Validators.maxLength(PHONE_MAX_LEN),
         Validators.pattern(PHONE_PATTERN)
      ])
   }

   public pickerOptions = {
      cssClass: 'generatePicker'
   }

   private sharingToggle: boolean = true
   private downloadToggle: boolean = true
   private wifiPasswordSave: string

   private startDateStr: string
   private endDateStr: string
   private startDateFormat: string
   private endDateFormat: string

   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private qrCodeService: QrCodeService,
      private historyService: HistoryService,
      private uiService: UiService,
      public languagesService: LanguagesService
   ) {
   }

   async ngOnInit() {
      await this.getActiveParams()
      this.pageSetup()
   }

   ionViewWillEnter() {
      this.uiService.headerTitle$.next(this.languagesService.key.header.create)
   }

   private async getActiveParams() {
      return await new Promise((resolve) => {
         this.route.params.subscribe((params: Params) => {
            if (params?.type) {
               this.type = params?.type
               resolve()
            } else {
               this.router.navigate(['home'])
               resolve()
            }
         })
      })
   }

   private buildForms(type: GenerateType) {
      switch (type) {
         case TYPE_SMS:
            this.formSms = new FormGroup({
               phone: new FormControl('', [
                  Validators.required,
                  Validators.minLength(PHONE_MIN_LEN),
                  Validators.maxLength(PHONE_MAX_LEN),
                  Validators.pattern(PHONE_PATTERN)
               ]),
               sms: new FormControl('', [
                  Validators.required,
                  Validators.minLength(SMS_MIN_LEN),
                  Validators.maxLength(SMS_MAX_LEN)
               ])
            })
            break
         case TYPE_WIFI:
            this.formWifi = new FormGroup({
               ssid: new FormControl('', [
                  Validators.required,
                  Validators.minLength(SSID_MIN_LEN),
                  Validators.maxLength(SSID_MAX_LEN)
               ]),
               wifi_type: new FormControl([]),
               password: new FormControl('', [
                  Validators.required,
                  Validators.minLength(WIFI_PASS_MIN_LEN),
                  Validators.maxLength(WIFI_PASS_MAX_LEN)
               ])
            })
            break
         case TYPE_EVENT:
            this.formEvent = new FormGroup({
               title: new FormControl('', [
                  Validators.required,
                  Validators.minLength(TITLE_MIN_LEN),
                  Validators.maxLength(TITLE_MAX_LEN)
               ]),
               date_start: new FormControl('', [
                  Validators.required,
                  Validators.minLength(DATE_MIN_LEN),
                  Validators.maxLength(DATE_MAX_LEN)
                  // Validators.pattern(DATE_PATTERN)
               ]),
               date_end: new FormControl('', [
                  Validators.required,
                  Validators.minLength(DATE_MIN_LEN),
                  Validators.maxLength(DATE_MAX_LEN)
                  // Validators.pattern(DATE_PATTERN)
               ]),
               location: new FormControl('', [
                  Validators.required,
                  Validators.minLength(LOCATION_MIN_LEN),
                  Validators.maxLength(LOCATION_MAX_LEN)
               ]),
               description: new FormControl('', [
                  Validators.minLength(DESCRIPTION_MIN_LEN),
                  Validators.maxLength(DESCRIPTION_MAX_LEN)
               ])
            })
            break
         case TYPE_ME:
            this.formMe = new FormGroup({
               fn: new FormControl('', [
                  Validators.required,
                  Validators.minLength(FN_MIN_LEN),
                  Validators.maxLength(FN_MAX_LEN)
               ]),
               organization: new FormControl('', [
                  Validators.required,
                  Validators.minLength(ORGANIZATION_MIN_LEN),
                  Validators.maxLength(ORGANIZATION_MAX_LEN)
               ]),
               address: new FormControl('', [
                  Validators.required,
                  Validators.minLength(ADDRESS_MIN_LEN),
                  Validators.maxLength(ADDRESS_MAX_LEN)
               ]),
               phone: new FormControl('', [
                  Validators.required,
                  Validators.minLength(ADDRESS_MIN_LEN),
                  Validators.maxLength(ADDRESS_MAX_LEN),
                  Validators.pattern(PHONE_PATTERN)
               ]),
               email: new FormControl('', [
                  Validators.required,
                  Validators.email,
                  Validators.minLength(EMAIL_MIN_LEN),
                  Validators.maxLength(EMAIL_MAX_LEN)
               ]),
               notes: new FormControl('', [
                  Validators.required,
                  Validators.minLength(NOTES_MIN_LEN),
                  Validators.maxLength(NOTES_MAX_LEN)
               ]),
            })
            break
         default:
            console.error('Unknown type!')
            break
      }
   }

   private pageSetup() {
      switch (this.type) {
         case TYPE_TEXT:
            this.placeholder = this.languagesService.key.pages.create.placeholders.text
            this.inputType = 'text'
            this.activeFormControl = this.formControls.text
            break
         case TYPE_EMAIL:
            this.placeholder = this.languagesService.key.pages.create.placeholders.email
            this.inputType = 'email'
            this.activeFormControl = this.formControls.email
            break
         case TYPE_URL:
            this.placeholder = this.languagesService.key.pages.create.placeholders.url
            this.inputType = 'text'
            this.activeFormControl = this.formControls.url
            break
         case TYPE_PHONE:
            this.placeholder = this.languagesService.key.pages.create.placeholders.phone
            this.inputType = 'tel'
            this.activeFormControl = this.formControls.phone
            break
         case TYPE_SMS:
            this.buildForms(TYPE_SMS)
            break
         case TYPE_WIFI:
            this.buildForms(TYPE_WIFI)
            break
         case TYPE_EVENT:
            this.buildForms(TYPE_EVENT)
            break
         case TYPE_ME:
            this.buildForms(TYPE_ME)
            break
         default:
            console.error('Unknown type!')
            break
      }
   }

   public async downloadCode() {
      try {
         if (!this.downloadToggle) return
         this.downloadToggle = false

         const canvas = <HTMLCanvasElement>document.querySelector('canvas')
         await this.qrCodeService.downloadQrCode(canvas)
         await this.historyService.pushHistory({
            type: 1,
            data: this.qrData
         })

         const timeout = setTimeout(() => {
            this.downloadToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         console.error(e)
         this.downloadToggle = true
      }
   }

   public async sharingCode() {
      try {
         if (!this.sharingToggle) return
         this.sharingToggle = false

         const canvas = <HTMLCanvasElement>document.querySelector('canvas')
         await this.qrCodeService.sharingQrCode(canvas, this.type)
         await this.historyService.pushHistory({
            type: 1,
            data: this.qrData
         })

         const timeout = setTimeout(() => {
            this.sharingToggle = true
            clearTimeout(timeout)
         }, TOGGLE_TIMEOUT)
      } catch (e) {
         console.error(e)
         this.sharingToggle = true
      }
   }

   public qrCodeChange(event) {
      this.qrData = event.target.value
   }

   public qrCodeChangeSms() {
      this.qrData = `smsto:${this.formSms?.value?.phone || ''}:${this.formSms?.value?.sms || ''}`
   }

   public qrCodeChangeWifi() {
      if (this.radioGroupValue === 'WPA') {
         this.qrData = `WIFI:S:${this.formWifi.value?.ssid || ''};T:WPA;P:${this.formWifi.value?.password || ''};H:false;`
      } else if (this.radioGroupValue === 'WEP') {
         this.qrData = `WIFI:S:${this.formWifi.value?.ssid || ''};T:WEP;P:${this.formWifi.value?.password || ''};H:false;`
      } else if (this.radioGroupValue === 'OPEN') {
         this.qrData = `WIFI:S:${this.formWifi.value?.ssid || ''};T:nopass;H:false;`
      }
   }

   public qrCodeChangeEvent() {
      this.qrData = (`
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
DTSTART:${this.startDateFormat}
DTEND:${this.endDateFormat}
SUMMARY:${this.formEvent.value?.title || ''}
DESCRIPTION:${this.formEvent.value?.description || ''}
LOCATION:${this.formEvent.value?.location || ''}
END:VEVENT
END:VCALENDAR
`)
   }

   public qrCodeChangeMe() {
      this.qrData = `MECARD:N:${this.formMe.value?.fn || ''};ORG:${this.formMe.value?.organization || ''};ADR:${this.formMe.value?.address};TEL:${this.formMe.value?.phone || ''};EMAIL:${this.formMe.value?.email || ''};NOTE:${this.formMe.value?.notes || ''};;`
   }

   public changeRadio(event) {
      const radioValue = event.detail.value
      if (radioValue !== 'OPEN') {
         this.addNewWifiInput()
      } else {
         if (this.formWifi.get('password')) {
            this.deleteWifiInput()
         }
      }
   }

   private addNewWifiInput() {
      const control = new FormControl(this.wifiPasswordSave, [
         Validators.required,
         Validators.minLength(WIFI_PASS_MIN_LEN),
         Validators.maxLength(WIFI_PASS_MAX_LEN)
      ])
      this.formWifi.addControl('password', control)
   }

   private deleteWifiInput() {
      this.wifiPasswordSave = this.formWifi.value.password
      this.formWifi.removeControl('password')
   }

   public openStartDate() {
      const elem = <HTMLElement>document.querySelector('#startDate')
      elem?.click()
   }

   public startDateChange(event) {
      const date = new Date(event.detail.value)
      this.startDateFormat = `${date.getUTCFullYear()}${date.getUTCMonth() + 1 < 10 ? '0' + (date.getUTCMonth() + 1): date.getUTCMonth() + 1}${date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate()}T${date.getUTCHours() < 10 ? '0' + date.getUTCHours(): date.getUTCHours()}${date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes(): date.getUTCMinutes()}00Z`
      this.startDateStr = `${date.getFullYear()}.${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1): date.getMonth() + 1}.${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} ${date.getHours() < 10 ? '0' + date.getHours(): date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()}`
      this.formEvent.get('date_start').patchValue(this.startDateStr)
      this.qrCodeChangeEvent()
   }

   public openEndDate() {
      const elem = <HTMLElement>document.querySelector('#endDate')
      elem?.click()
   }

   public endDateChange(event) {
      const date = new Date(event.detail.value)
      this.endDateFormat = `${date.getUTCFullYear()}${date.getUTCMonth() + 1 < 10 ? '0' + (date.getUTCMonth() + 1): date.getUTCMonth() + 1}${date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate()}T${date.getUTCHours() < 10 ? '0' + date.getUTCHours(): date.getUTCHours()}${date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes(): date.getUTCMinutes()}00Z`
      this.endDateStr = `${date.getFullYear()}.${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1): date.getMonth() + 1}.${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} ${date.getHours() < 10 ? '0' + date.getHours(): date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()}`
      this.formEvent.get('date_end').patchValue(this.endDateStr)
      this.qrCodeChangeEvent()
   }
}
