import {Injectable} from '@angular/core'
import {Market} from '@ionic-native/market/ngx'

import {APP_PACKAGE} from '../constants'

@Injectable()
export class MarketService {

   constructor(private market: Market) {
   }

   public async openAppInMarket() {
      await this.market.open(APP_PACKAGE)
   }
}
