<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <div v-else-if="!records.length" class="center">
      <p>Записей пока нет</p>
      <router-link to="/record">Добавить запись</router-link>
    </div>
    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/History/HistoryTable.vue";

export default {
  name: "History",
  data() {
    return {
      loading: true,
      records: [],
      categories: [],
    };
  },
  components: { HistoryTable },
  async mounted() {
    this.categories = await this.$store.dispatch("getCategories");

    const records = await this.$store.dispatch("getRecords");
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find(
          (category) => category.id === record.categoryId
        ).title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход",
      };
    });
    this.loading = false;
  },
};
</script>
