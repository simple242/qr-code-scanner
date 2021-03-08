import {Injectable} from '@angular/core'
import {ToastController} from '@ionic/angular'

@Injectable()
export class ToastService {

   constructor(
      private toastController: ToastController
   ) {
   }

   public async alertSuccess(text: string, duration: number = 3000) {
      const toast: HTMLIonToastElement = await this.toastController.create({
         header: text,
         duration: duration,
         position: 'top',
         cssClass: 'alert alert-success',
         animated: true
      })
      await toast.present()
   }

   public async alertDanger(text: string, duration: number = 3000) {
      const toast: HTMLIonToastElement = await this.toastController.create({
         header: text,
         duration: duration,
         position: 'top',
         cssClass: 'alert alert-danger',
         animated: true
      })
      await toast.present()
   }
}
