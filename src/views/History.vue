<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет
      <router-link to="/record">Добавте первую</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin.js";

// плагин для графиков vue chart js

// могут быть ошибки от новых версий см ссылку https://best-itpro.ru/news/oshibka_export_default_imported_as_chart_was_not_found_in_chart_js/
//export 'default' (imported as 'Chart') was not found in 'chart.js'
// ... т.е. не удается найти модуль 'chart.js'
// Так вот, возникает она из-за того, что версии vue-chartjs не поспевают за последними версиями Chart.js.
//  А когда вы запускаете команду npm install vue-chartjs chart.js --save в своём проекте, то на выходе получаете самые последние версии vue-chartjs и chart.js,
//  у которых может быть несовместимость.
// Решение очень простое - вам нужно просто понизить версию chart.js, и всё!
//
// https://vue-chartjs.org/ru/
// https://www.chartjs.org/docs/latest/#creating-a-chart
// https://codepen.io/apertureless/pen/zEvvWM?editors=1010
import { Pie } from "vue-chartjs";

export default {
  name: "history",
  //
  extends: Pie,
  //
  mixins: [paginationMixin],
  //
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    // const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    // метод
    this.setup(categories);

    this.loading = false;
  },
  data: () => ({
    loading: true,
    records: [],
  }),
  //
  components: {
    HistoryTable,
  },
  //
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.categoryId)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Доход" : "Расход",
          };
        })
      );

      // плагин vue chart js для графиков
      this.renderChart({
        labels: categories.map((c) => c.title),
        datasets: [
          {
            label: "Расходы по категориям",
            data: categories.map((c) => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === "outcome") {
                  total += r.amount;
                }
                return total;
              }, 0);
            }),
            // цвета для кол-ва пользователей, для диаграммы, цвет и обводка
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(225, 151, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(125, 051, 64, 0.2)",
            ],
            borderWidth: 1,
          },
        ],
      });
    },
  },
};
</script>