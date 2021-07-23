    // в роутере есть объект meta и мы можем передавать свои кастомные свойства - пример
    // meta:{layout:'empty'}  название лейаута empty
    // ссылка на пример как подключать layouts - https://www.youtube.com/watch?v=Pm2aASoksJU&list=PLqKQF2ojwm3njNpksFCi8o-_c-9Vva_W0&index=3
    // Смотреть файл App.vue там подключаем лейауты все !!!!


    <!-- файл App. vue -->
<div id="app">
<!-- используем component для layouts -->
<component :is="layout">
    <router-view />
</component>
</div>


<script>
// Лейауты
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  components: { EmptyLayout, MainLayout },
  computed: {
    layout() {
      // нужно передавать  в :is строку в component

      // указываем имя лейаута и дописываем статику - путь
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
};
</script>