<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from "@/utils/messages";
export default {
  name: "main-layout",

  data: () => ({
    isOpen: true,
    loading: true,
  }),

  components: {
    Navbar,
    Sidebar,
  },
  async mounted() {
    // получаем имя пользователя и если оно не пустая строка
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }

    this.loading = false;
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    // следим за ошибками
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },
};
</script>
