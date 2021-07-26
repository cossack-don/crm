export default function currencyFilter(value, currency = 'RUB') {
// фльтр валюты в компоненте HomeBill
return new Intl.NumberFormat('ru-Ru', {style:'currency',currency}).format(value)

}