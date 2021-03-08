import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {IonicModule} from '@ionic/angular'

import {SharedModule} from '../shared/shared.module'
import {HistoryRoutingModule} from './history-routing.module'
import {MainComponent} from './main/main.component'

@NgModule({
   declarations: [
      MainComponent
   ],
   imports: [
      CommonModule,
      IonicModule,
      HistoryRoutingModule,
      SharedModule
   ]
})
export class HistoryModule {
}
