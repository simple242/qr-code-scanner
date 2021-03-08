import {Injectable} from '@angular/core'
import {NativeStorage} from '@ionic-native/native-storage/ngx'

import {History} from '../models'
import {DateService} from './date.service'
import {ToastService} from './toast.service'
import {LanguagesService} from './languages.service'

@Injectable()
export class HistoryService {

   private history: History[] = []
   private readonly KEY: string = 'key/history'

   constructor(
      private dateService: DateService,
      private nativeStorage: NativeStorage,
      private toastService: ToastService,
      private languagesService: LanguagesService
   ) {
   }

   public get historyArray(): History[] {
      return this.history
   }

   public async pushHistory(historyItem: History) {
      try {
         historyItem.date = this.dateService.fullDateTime
         historyItem.id = Date.now() + this.history.length

         const oldHistory: History[] = await this.getStorageHistory()
         oldHistory.unshift(historyItem)
         this.history = [...oldHistory]
         await this.nativeStorage.setItem(this.KEY, this.history)
      } catch (e) {
         console.error(e)
      }
   }

   public async loadHistory() {
      try {
         const oldHistory: History[] = await this.getStorageHistory()
         this.history = [...oldHistory]
      } catch (e) {
         console.error(e)
      }
   }

   public async removeHistoryItem(id: number) {
      try {
         const newHistory = this.history.filter(h => h.id !== id)
         await this.nativeStorage.setItem(this.KEY, newHistory)
         await this.loadHistory()
      } catch (e) {
         console.error(e)
      }
   }

   public async clearHistory() {
      try {
         this.history = []
         await this.nativeStorage.remove(this.KEY)
         await this.toastService.alertSuccess(this.languagesService.key.toasts.history)
      } catch (e) {
         console.error(e)
         await this.toastService.alertDanger(this.languagesService.key.toasts.unHistory)
      }
   }

   private async getStorageHistory(): Promise<History[]> {
      try {
         return await this.nativeStorage.getItem(this.KEY)
      } catch (e) {
         console.error(e)
         return []
      }
   }
}


