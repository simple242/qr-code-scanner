import {TYPE_EMAIL, TYPE_EVENT, TYPE_ME, TYPE_PHONE, TYPE_SMS, TYPE_TEXT, TYPE_URL, TYPE_WIFI} from '../constants'

export type GenerateType =
   typeof TYPE_URL
   | typeof TYPE_EMAIL
   | typeof TYPE_TEXT
   | typeof TYPE_PHONE
   | typeof TYPE_SMS
   | typeof TYPE_WIFI
   | typeof TYPE_EVENT
   | typeof TYPE_ME
