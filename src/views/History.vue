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
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="onChangePage"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/History/HistoryTable.vue";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: "History",
  data() {
    return {
      loading: true,
      records: [],
    };
  },
  components: { HistoryTable },
  mixins: [paginationMixin],
  async mounted() {
    this.records = await this.$store.dispatch("getRecords");
    const categories = await this.$store.dispatch("getCategories");

    this.setupPagination(
      this.records.map((record) => {
        return {
          ...record,
          categoryName: categories.find(
            (category) => category.id === record.categoryId
          ).title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText: record.type === "income" ? "Доход" : "Расход",
        };
      })
    );
    this.loading = false;
  },
};
</script>
