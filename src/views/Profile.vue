<template>
  <div>
    <div class="page-title">
      <h3>{{ "ProfileTitle" | localize }}</h3>
    </div>
    <!-- Form -->
    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="description">{{ "Name" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{ "Message_EnterName" | localize }}</small
        >
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <!-- btn -->
      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
    <!-- #form -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  validations: {
    name: { required },
  },
  //
  data: () => ({
    name: "",
    isRuLocale: true,
  }),
  //
  computed: {
    ...mapGetters(["info"]),
  },
  mounted() {
    this.name = this.info.name;
    // смотрим флаг русский язык или нет
    this.isRuLocale = this.info.locale === "ru-RU";
    // мини хак чтобы обновился инпут
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },

  methods: {
    ...mapActions(["updateInfo"]),

    async submitHandler() {
      // вилидируем email input
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        // cмена имени в firebase + в профиле
        await this.updateInfo({
          name: this.name,
          // смена ru на en
          locale: this.isRuLocale ? "ru-RU" : "en-EN",
        });
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>