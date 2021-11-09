import {Injectable} from '@angular/core'

@Injectable()
export class DateService {

   public get date(): Date {
      return new Date()
   }

   public get year(): string {
      return this.date.getFullYear().toString()
   }

   public get month(): string {
      const month = this.date.getMonth() + 1

      if (month < 10) {
         return '0' + month
      } else {
         return month.toString()
      }
   }

   public get day(): string {
      const day = this.date.getDate()

      if (day < 10) {
         return '0' + day
      } else {
         return day.toString()
      }
   }

   public get hours(): string {
      const hours = this.date.getHours()

      if (hours < 10) {
         return '0' + hours
      } else {
         return hours.toString()
      }
   }

   public get minutes(): string {
      const minutes = this.date.getMinutes()

      if (minutes < 10) {
         return '0' + minutes
      } else {
         return minutes.toString()
      }
   }

   public get seconds(): string {
      const seconds = this.date.getSeconds()

      if (seconds < 10) {
         return '0' + seconds
      } else {
         return seconds.toString()
      }
   }

   public get fullDate(): string {
      return `${this.year}.${this.month}.${this.day}`
   }

   public get fullTime(): string {
      return `${this.hours}:${this.minutes}:${this.seconds}`
   }

   public get fullDateTime(): string {
      return `${this.fullDate}-${this.fullTime}`
   }

}
