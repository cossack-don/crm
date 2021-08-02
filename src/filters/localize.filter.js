import store from '../store'
// перевод слов с en / ru
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
    'ru-RU':ru,
    'en-EN':en
}

export default function localizeFilter(key) {
const locale = store.getters.info.locale || 'ru-RU'
 
return locales[locale][key] || `[Localize error] : key ${key} not found`

}