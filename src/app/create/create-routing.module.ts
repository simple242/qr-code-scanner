import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {MainComponent} from './main/main.component'
import {GenerateCodeComponent} from './generate-code/generate-code.component'

const routes: Routes = [
   {
      path: '',
      component: MainComponent
   },
   {
      path: 'generate/:type',
      component: GenerateCodeComponent
   }
]

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class CreateRoutingModule {
}
