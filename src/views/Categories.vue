<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <AddCategory @add="addNewCategory" />
        <EditCategory />
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
    return { categories: [] };
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },
  },
};
</script>
