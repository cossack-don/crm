<template>
  <div id="app">
    <!-- используем component для layouts -->
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

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

<style lang="scss">
// стили из materialize-css
@import "~materialize-css/dist/css/materialize.min.css";
// свои стили из папки assets
@import "assets/index.css";
</style>
