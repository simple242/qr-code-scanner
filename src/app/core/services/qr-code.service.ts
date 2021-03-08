import {Injectable} from '@angular/core'
import {Base64ToGallery, Base64ToGalleryOptions} from '@ionic-native/base64-to-gallery/ngx'
import {SocialSharing} from '@ionic-native/social-sharing/ngx'
import {BarcodeScanner, BarcodeScanResult, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx'
import {Clipboard} from '@ionic-native/clipboard/ngx'
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx'
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx'

import {GenerateType} from '../models'
import {DateService} from './date.service'
import {ToastService} from './toast.service'
import {TYPE_TEXT} from '../constants'
import {OptionsService} from './options.service'
import {LanguagesService} from './languages.service'

declare const qrcode: any

@Injectable()
export class QrCodeService {

   constructor(
      private base64ToGallery: Base64ToGallery,
      private socialSharing: SocialSharing,
      private dateService: DateService,
      private barcodeScanner: BarcodeScanner,
      private clipboard: Clipboard,
      private imagePicker: ImagePicker,
      private toastService: ToastService,
      private optionsService: OptionsService,
      private languagesService: LanguagesService,
      private androidPermissions: AndroidPermissions
   ) {
   }

   private async checkPermission() {
      try {
         const permission = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
         if(!permission?.hasPermission) {
            await this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE])
         }
      } catch (e) {
         console.error(e)
      }
   }

   public async downloadQrCode(canvas: HTMLCanvasElement) {
      try {
         await this.checkPermission()

         const imageData = canvas.toDataURL('image/jpeg').toString()
         const data = imageData.split(',')[1]

         const options: Base64ToGalleryOptions = {
            prefix: '_img',
            mediaScanner: true
         }

         await this.base64ToGallery.base64ToGallery(data, options)
         await this.toastService.alertSuccess(this.languagesService.key.toasts.download)
      } catch (e) {
         console.error(e)
         await this.toastService.alertDanger(this.languagesService.key.toasts.unDownload)
      }
   }

   public async sharingQrCode(canvas: HTMLCanvasElement, type: GenerateType = TYPE_TEXT) {
      try {
         const imageData = canvas.toDataURL('image/jpeg').toString()
         const text = `qr-code-${type.toLowerCase()}-${this.dateService.fullDateTime}`

         await this.socialSharing.share(text, 'qr-code', imageData)
      } catch (e) {
         console.error(e)
      }
   }

   public async sharingText(result: string) {
      await this.socialSharing.share(result)
   }

   public async scanQrCode(): Promise<string | null> {
      try {
         const options: BarcodeScannerOptions = {
            showFlipCameraButton: this.optionsService.options$.value.frontalCamera,
            showTorchButton: this.optionsService.options$.value.showTorch,
            disableSuccessBeep: !this.optionsService.options$.value.beep,
            prompt: '',
            disableAnimations: false
         }
         const barcodeData: BarcodeScanResult = await this.barcodeScanner.scan(options)

         if (barcodeData?.text) {
            return barcodeData?.text
         } else {
            throw new Error('Qr Code scan Error!')
         }
      } catch (e) {
         console.error(e)
         return null
      }
   }

   public async copyQrCodeToClipboard(text: string) {
      try {
         await this.clipboard.copy(text)
         await this.toastService.alertSuccess(this.languagesService.key.toasts.copy)
      } catch (e) {
         console.error(e)
         await this.toastService.alertDanger(this.languagesService.key.toasts.unCopy)
      }
   }

   public async loadQrCodeFromGallery(): Promise<string | null> {
      try {
         const options: ImagePickerOptions = {
            maximumImagesCount: 1,
            quality: 50,
            outputType: 1,
            width: 100
         }

         const results = await this.imagePicker.getPictures(options)
         const img = `data:image/jpeg;base64,${results[0]}`

         return await new Promise((resolve, reject) => {
            this.decodeImageFromBase64(img, decodedInformation => {
               if (decodedInformation === 'Failed to load the image') {
                  reject('Decode image error')
               } else if (decodedInformation === 'error decoding QR Code') {
                  this.toastService.alertDanger(this.languagesService.key.toasts.unLoadGallery)
                  reject('Decode image error')
               } else {
                  resolve(decodedInformation)
               }
            })
         })
      } catch (e) {
         console.error(e)
         return null
      }
   }

   private decodeImageFromBase64(data, callback) {
      qrcode.callback = callback
      qrcode.decode(data)
   }
}
