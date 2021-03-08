import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'

@Injectable()
export class UiService {

   public headerTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('')
   public isMainPage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

   public isShowDrawer$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

   constructor(

   ) {
   }

   public showDrawer() {
      this.isShowDrawer$.next(true)
   }

   public closeDrawer() {
      this.isShowDrawer$.next(false)
   }

}
