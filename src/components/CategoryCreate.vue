<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>
      <!-- form -->
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <!-- v-model -->
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">Название</label>
          <!-- warning -->
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <!-- v-model -->
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <!-- warning -->
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
            >Минимальная значение {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
      <!-- #form -->
    </div>
  </div>
</template>

<script>
// плагин vuevalidate
import { required, minValue } from "vuelidate/lib/validators";

export default {
  data: () => ({
    title: "",
    limit: 100,
  }),
  //
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  //
  mounted() {
    //   исправляем небольшой баг с полем лимит, чтобы плейсхолдер не накладывался на значение в инпуте
    M.updateTextFields();
  },
  //
  methods: {
    //   отправка формы
    async submitHandler() {
      // проверка на валидность
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        //   передаем что получили из полей в стор
        const category = await this.$store.dispatch("createCategory", {
          title: this.title,
          limit: this.limit,
        });
        // reset forms
        this.title = "";
        this.limit = 100;
        this.$v.$reset();
        // всплывающие окошко
        this.$message("Категория была создана");
        // получаем данные из родительского компонента
        this.$emit("created", category);
      } catch (e) {}
    },
  },
};
</script>

<style>
</style>