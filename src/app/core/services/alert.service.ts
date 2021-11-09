import {Injectable} from '@angular/core'
import {AlertController} from '@ionic/angular'

@Injectable()
export class AlertService {

   constructor(
      public alertController: AlertController
   ) {
   }

   public async presentAlert(title: string, leftBtn: string, rightBtn: string, text: string = null) {
      let choice
      const alert = await this.alertController.create({
         cssClass: 'complexAlert',
         header: title,
         message: text,
         backdropDismiss: false,
         buttons: [
            {
               text: leftBtn,
               handler() {
                  alert.dismiss(false)
                  return false
               }
            }, {
               text: rightBtn,
               handler: () => {
                  alert.dismiss(true)
                  return false
               }
            }
         ]
      })

      await alert.present()
      await alert.onDidDismiss().then((data) => {
         choice = data
      })
      return choice
   }
}
