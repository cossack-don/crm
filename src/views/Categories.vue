<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <!-- создание категории -->
        <CategoryCreate @created="addNewCategory" />
        <!-- редактирование категории -->

        <!-- хак с помощью ключа он рендерит конкретно этот компонент и при каждом обновление он перерендыривает этот блок кода - компонент -->
        <!-- :key="categories.length + updateCount" -->
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          @updated="updatedCategories"
          :key="categories.length + updateCount"
        />
        <p v-else class="center">Категорий пока нету</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";

export default {
  name: "categories",
  //
  data: () => ({
    categories: [],
    loading: true,
    // используем для :key чтоб перерендыривать данный кусок компонента
    updateCount: 0,
  }),
  //
  components: {
    CategoryEdit,
    CategoryCreate,
  },
  //
  methods: {
    // добавляем новую категорию
    addNewCategory(category) {
      this.categories.push(category);
      // console.log(this.categories);
    },
    // обновляем категорию
    updatedCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
  //
  // хук
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    console.log(this.categories);
  },
};
</script>