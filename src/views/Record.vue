<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <!-- preloader -->
    <Loader v-if="loading" />
    <!-- #preloader -->

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <!-- доход -->
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <!-- расход -->
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <!-- amount -->
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
          >Минимальная значение {{ $v.amount.$params.minValue.min }}</span
        >
      </div>

      <div class="input-field">
        <!-- discription -->
        <input
          id="description"
          type="text"
          v-model="discription"
          :class="{
            invalid: $v.discription.$dirty && !$v.discription.required,
          }"
        />
        <label for="description">Описание</label>
        <span
          v-if="$v.discription.$dirty && !$v.discription.required"
          class="helper-text invalid"
          >Введите описание</span
        >
      </div>

      <!-- BTN -->
      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "record",
  //
  data: () => ({
    categories: [],
    loading: true,
    select: null,
    category: null,
    // расход и доход
    type: "outcome",

    amount: 1,
    discription: "",
  }),
  //
  validations: {
    amount: { minValue: minValue(1) },
    discription: { required },
  },
  //
  computed: {
    ...mapGetters(["info"]),

    camCreateRecord() {
      if (this.type === "income") {
        return true;
      }

      return this.info.bill >= this.amount;
    },
  },
  //
  methods: {
    async handleSubmit() {
      // валидируем
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.camCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            discription: this.discription,
            type: this.type,
            date: new Date().toJSON(),
          });

          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;

          await this.$store.dispatch("updateInfo", { bill });
          this.$message("Запись успешно создана");
          this.$v.$reset();
          this.amount = 1;
          this.discription = "";
        } catch (e) {}
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        );
      }
    },
  },
  //
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    // минихак отрисовки селекта из за асинхронного этапа
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      // исправляем мини баг в поле сумма то чтобы подставлялось 1 корректноы
      M.updateTextFields();
    }, 0);
  },
  //
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
