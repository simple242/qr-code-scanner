import {Injectable} from '@angular/core'

import {ToastService} from './toast.service'
import {LanguagesService} from './languages.service'
import {Sms} from '../models'

@Injectable()
export class SmsService {

   constructor(
      private toastService: ToastService,
      private languagesService: LanguagesService
   ) {
   }

   public async sendSms({number, text}: Sms) {
      try {
         window.open (`sms:${number}?&body=${text}`,'_system')
      } catch (e) {
         console.error(e)
         await this.toastService.alertDanger(this.languagesService.key.toasts.unSendSms)
      }
   }
}
