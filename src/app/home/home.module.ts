import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {IonicModule} from '@ionic/angular'

import {SharedModule} from '../shared/shared.module'
import {HomeRoutingModule} from './home-routing.module'
import {MainComponent} from './main/main.component'

@NgModule({
   imports: [
      CommonModule,
      IonicModule,
      SharedModule,
      HomeRoutingModule
   ],
   declarations: [
      MainComponent
   ],
   providers: [

   ]
})
export class HomeModule {
}
