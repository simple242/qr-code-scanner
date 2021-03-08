import {Injectable} from '@angular/core'
import {NativeStorage} from '@ionic-native/native-storage/ngx'
import {BehaviorSubject} from 'rxjs'

import {Options} from '../models'

@Injectable()
export class OptionsService {

   public options$: BehaviorSubject<Options> = new BehaviorSubject<Options>({
      isDarkTheme: false,
      frontalCamera: false,
      showTorch: false,
      beep: false
   })

   private readonly OPTIONS_KEY: string = 'key/options'

   constructor(
      private nativeStorage: NativeStorage
   ) {
   }

   public async loadOptions() {
      try {
         const options: Options = await this.nativeStorage.getItem(this.OPTIONS_KEY)
         this.options$.next(options)
      } catch (e) {
         console.error(e)
      }
   }

   public async saveOptions(options: Options) {
      try {
         this.options$.next({...options})
         await this.nativeStorage.setItem(this.OPTIONS_KEY, options)
      } catch (e) {
         console.error(e)
      }
   }

   public async changeAppTheme() {
      try {
         const body: HTMLBodyElement = document.querySelector('body')

         if (!this.options$.value.isDarkTheme) {
            if (!body.classList.contains('dark')) body.classList.add('dark')
            const options = {
               ...this.options$.value,
               isDarkTheme: true
            }
            this.options$.next(options)
            await this.nativeStorage.setItem(this.OPTIONS_KEY, options)
         } else {
            if (body.classList.contains('dark')) body.classList.remove('dark')
            const options = {
               ...this.options$.value,
               isDarkTheme: false
            }
            this.options$.next(options)
            await this.nativeStorage.setItem(this.OPTIONS_KEY, options)
         }
      } catch (e) {
         console.error(e)
      }
   }

   public async checkTheme() {
      try {
         const options: Options = this.options$.value
         if (options.isDarkTheme) this.enableDarkTheme()
      } catch (e) {
         console.error(e)
      }
   }

   private enableDarkTheme() {
      const body: HTMLBodyElement = document.querySelector('body')
      if (!body.classList.contains('dark')) body.classList.add('dark')
      this.options$.next({
         ...this.options$.value,
         isDarkTheme: true
      })
   }
}
