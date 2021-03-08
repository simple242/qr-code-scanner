import {Component, OnInit} from '@angular/core'
import {Location} from '@angular/common'

import {UiService} from '../../core/services'
import {Router} from '@angular/router'

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   constructor(
      public uiService: UiService,
      private location: Location,
      private router: Router
   ) {
   }

   ngOnInit() {
   }

   public async goBack() {
      if (location.href.endsWith('/create')) {
         this.router.navigate(['home'])
      } else {
         this.location.back()
      }
   }

   public openDrawer() {
      this.uiService.showDrawer()
   }

   public async exit() {
      try {
         navigator['app'].exitApp()
      } catch (e) {
         console.error(e)
      }
   }
}
