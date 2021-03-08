import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode'

@NgModule({
   declarations: [],
   imports: [
      FormsModule,
      NgxQRCodeModule
   ],
   exports: [
      FormsModule,
      NgxQRCodeModule
   ]
})
export class SharedModule {
}
