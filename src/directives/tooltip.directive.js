export default {
    // создаем свою директиву
    bind(el, {value}) {
        // компонент из библиотеки материалайз
        M.Tooltip.init(el, {html:value})
    },
    // убиваем директиву
    unbind(el) {
        // компонент из библиотеки материалайз
       const tooltip =M.Tooltip.getInstance(el)

       if(tooltip && tooltip.destroy) {
        tooltip.destroy()
       }
    }
    
}