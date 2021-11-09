import {Injectable} from '@angular/core'

import {LANGUAGE_EN, LANGUAGE_RU} from '../constants'
import {NativeStorage} from '@ionic-native/native-storage/ngx'
import {BehaviorSubject} from 'rxjs'

type Languages = typeof LANGUAGE_RU | typeof LANGUAGE_EN

@Injectable()
export class LanguagesService {

   public isLangChange$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

   private currentLanguage: Languages = LANGUAGE_EN
   private russianLanguage = [
      'ru', 'uk', 'kk', 'uz', 'be', 'az', 'ky', 'tg', 'ka', 'hy', 'lv', 'ro', 'lt', 'et'
   ]

   private readonly KEY: string = 'key/language'

   public readonly textContent = {
      [LANGUAGE_RU]: {
         language: 'Русский',
         lang: 'RU',
         pages: {
            main: {
               scan: 'Сканировать',
               create: 'Создать',
               gallery: 'Галерея',
               history: 'История',
               sharing: 'Поделиться',
               star: 'Оценить',
               setting: 'Настройки'
            },
            create: {
               url: 'URL',
               email: 'Email',
               text: 'Текст',
               phone: 'Телефон',
               wifi: 'Wi-Fi',
               sms: 'СМС',
               event: 'Событие',
               me: 'Визитка',
               empty: 'Введите данные',
               placeholders: {
                  email: 'Email...',
                  text: 'Текст...',
                  url: 'Url...',
                  phone: 'Телефон...',
                  sms: {
                     phone: 'Телефон',
                     sms: 'СМС'
                  },
                  wifi: {
                     ssid: 'SSID',
                     password: 'Пароль'
                  },
                  event: {
                     name: 'Название',
                     date_start: 'Дата начала',
                     date_end: 'Дата окончания',
                     location: 'Расположение',
                     description: 'Описание'
                  },
                  me: {
                     fn: 'ФИО',
                     organization: 'Организация',
                     address: 'Адрес',
                     phone: 'Телефон',
                     email: 'Email',
                     notes: 'Примечания'
                  }
               }
            },
            history: {
               placeholder: 'Поиск...',
               empty: 'Нет данных'
            }
         },
         scanner: {
            qrCode: 'QR-Код',
            content: 'Содержание',
            btns: {
               send: 'Написать',
               open: 'Открыть'
            }
         },
         header: {
            main: 'Сканирование',
            create: 'Создание',
            history: 'История'
         },
         drawer: {
            app: 'Приложение',
            theme: 'Темная тема',
            clear: 'Очистить историю',
            scanner: 'Сканнер',
            camera: 'Фронтальная камера',
            flashlight: 'Фонарик',
            sound: 'Звук',
            language: 'Язык',
            select: {
               cancel: 'Отмена',
               ok: 'OK'
            }
         },
         btns: {
            download: 'Загрузить',
            sharing: 'Поделиться'
         },
         history: {
            generate: 'Сгенерирован',
            scanning: 'Сканирован',
            gallery: 'Загружен с галереи'
         },
         toasts: {
            copy: 'Скопировано в буфер обмена',
            unCopy: 'Ошибка копирования в буфер обмена',
            history: 'История успешно очищена',
            unHistory: 'Ошибка очистки истории',
            download: 'QR-код успешно сохранен на ваше устройство',
            unDownload: 'Ошибка сохранения QR-кода',
            unLoadGallery: 'Изображение не содержит QR-код',
            unToEmail: 'На вашем устройстве не установлен почтовый клиент',
            unSendSms: 'Ошибка отправки СМС',
            unOpen: 'Ошибка открытия браузера'
         },
         alerts: {
            remove: {
               title: 'Удалить этот QR-Код?',
               left: 'Отмена',
               right: 'Удалить'
            },
            close: {
               title: 'Скрыть данные отсканированного кода?',
               left: 'Отмена',
               right: 'Закрыть'
            },
            clearHistory: {
               title: 'Очистить всю историю?',
               left: 'Отмена',
               right: 'Очистить'
            }
         },
         pickers: {
            date: {
               cancel: 'Отмена',
               done: 'Выбрать'
            }
         }
      },
      [LANGUAGE_EN]: {
         language: 'English',
         lang: 'EN',
         pages: {
            main: {
               scan: 'Scan',
               create: 'Create',
               gallery: 'Gallery',
               history: 'History',
               sharing: 'Share',
               star: 'Rate',
               setting: 'Settings'
            },
            create: {
               url: 'URL',
               email: 'Email',
               text: 'Text',
               phone: 'Phone',
               wifi: 'Wi-Fi',
               event: 'Event',
               sms: 'SMS',
               me: 'Business card',
               empty: 'Enter data',
               placeholders: {
                  email: 'Email...',
                  text: 'Text...',
                  url: 'Url...',
                  phone: 'Phone...',
                  sms: {
                     phone: 'Phone',
                     sms: 'SMS'
                  },
                  wifi: {
                     ssid: 'SSID',
                     password: 'Password'
                  },
                  event: {
                     name: 'Title',
                     date_start: 'Date of the beginning',
                     date_end: 'Expiration date',
                     location: 'Location',
                     description: 'Description'
                  },
                  me: {
                     fn: 'Full name',
                     organization: 'Organization',
                     address: 'Address',
                     phone: 'Phone',
                     email: 'Email',
                     notes: 'Notes'
                  }
               }
            },
            history: {
               placeholder: 'Search...',
               empty: 'There is no data'
            }
         },
         scanner: {
            qrCode: 'QR Code',
            content: 'Content',
            btns: {
               send: 'Send',
               open: 'Open'
            }
         },
         header: {
            main: 'Scanning',
            create: 'Creature',
            history: 'History'
         },
         drawer: {
            app: 'App',
            theme: 'Dark theme',
            clear: 'Clear history',
            scanner: 'Scanner',
            camera: 'Front-camera',
            flashlight: 'Flashlight',
            sound: 'Sound',
            language: 'Language',
            select: {
               cancel: 'Cancel',
               ok: 'OK'
            }
         },
         btns: {
            download: 'Download',
            sharing: 'Share'
         },
         history: {
            generate: 'Generated',
            scanning: 'Scanned',
            gallery: 'Loaded from gallery'
         },
         toasts: {
            copy: 'Successfully copied to the clipboard',
            unCopy: 'Error copying to clipboard',
            history: 'History cleared successfully',
            unHistory: 'Error clearing history',
            download: 'The QR Code has been successfully saved to your device',
            unDownload: 'Error saving QR code',
            unLoadGallery: 'Image does not contain QR Code',
            unToEmail: 'Your device does not have any email client installed',
            unSendSms: 'Error sending SMS',
            unOpen: 'Browser opening error'
         },
         alerts: {
            remove: {
               title: 'Delete this QR Code?',
               left: 'Cancel',
               right: 'Delete'
            },
            close: {
               title: 'Hide scanned code data?',
               left: 'Cancel',
               right: 'Hide'
            },
            clearHistory: {
               title: 'Clear all history?',
               left: 'Cancel',
               right: 'Clear'
            }
         },
         pickers: {
            date: {
               cancel: 'Cancel',
               done: 'Done'
            }
         }
      }
   }

   public key = this.textContent[LANGUAGE_EN]

   constructor(
      private nativeStorage: NativeStorage
   ) {
   }

   public async checkLanguage() {
      try {
         const lang = await this.nativeStorage.getItem(this.KEY)
         if (lang) {
            this.key = this.textContent[lang]
         } else {
            await this.defineLanguage()
         }
      } catch (e) {
         console.error(e)
         await this.defineLanguage()
      }
   }

   private async defineLanguage() {
      const lang: string = window.navigator.language

      if (lang) {
         let checkRuLang: boolean = false

         this.russianLanguage.forEach(el => {
            if (lang.includes(el)) {
               checkRuLang = true
            }
         })

         if (checkRuLang) {
            this.currentLanguage = LANGUAGE_RU
            this.setCurrentLanguage(LANGUAGE_RU)
         } else {
            this.currentLanguage = LANGUAGE_EN
            this.setCurrentLanguage(LANGUAGE_EN)
         }
      }

      this.key = this.textContent[this.currentLanguage]
      // this.key = this.textContent[LANGUAGE_EN]
   }

   public async setCurrentLanguage(lang: Languages) {
      try {
         if (lang === LANGUAGE_EN || lang === LANGUAGE_RU) {
            this.key = this.textContent[lang]
            this.isLangChange$.next(true)
            await this.nativeStorage.setItem(this.KEY, lang)
         }
      } catch (e) {
         console.error(e)
      }
   }
}
