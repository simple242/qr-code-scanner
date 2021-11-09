import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {IonicModule} from '@ionic/angular'

import {SharedModule} from '../shared/shared.module'
import {MainComponent} from './main/main.component'
import {CreateRoutingModule} from './create-routing.module'
import {GenerateCodeComponent} from './generate-code/generate-code.component'

@NgModule({
   declarations: [
      MainComponent,
      GenerateCodeComponent
   ],
   imports: [
      CommonModule,
      IonicModule,
      ReactiveFormsModule,
      CreateRoutingModule,
      SharedModule,
   ],
   providers: []
})
export class CreateModule {
}
