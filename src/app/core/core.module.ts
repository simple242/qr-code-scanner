import {NgModule} from '@angular/core'
import {
   DateService,
   QrCodeService,
   MarketService,
   ToastService,
   HistoryService,
   UiService,
   AlertService,
   OptionsService,
   LanguagesService,
   SmsService,
   BrowserService
} from './services'

@NgModule({
   providers: [
      DateService,
      QrCodeService,
      MarketService,
      ToastService,
      HistoryService,
      UiService,
      AlertService,
      OptionsService,
      LanguagesService,
      SmsService,
      BrowserService
   ]
})
export class CoreModule {
}
