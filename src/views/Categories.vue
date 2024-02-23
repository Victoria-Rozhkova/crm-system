<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("categories.title") }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <AddCategory @add="addNewCategory" />
        <EditCategory
          v-if="categories.length"
          :categories="categories"
          @edit="editCategory"
          :key="categories.length + update"
        />
        <p v-else class="center">{{ $t("common.noCategories") }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import AddCategory from "@/components/Categories/AddCategory.vue";
import EditCategory from "@/components/Categories/EditCategory.vue";

export default {
  name: "Categories",
  components: {
    AddCategory,
    EditCategory,
  },
  data() {
    return {
      categories: [],
      loading: true,
      update: 0,
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("getCategories");
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    editCategory(category) {
      const index = this.categories.findIndex(
        (categoryItem) => categoryItem.id === category.id
      );
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.update++;
    },
  },
};
</script>
