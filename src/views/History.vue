<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("history.title") }}</h3>
    </div>

    <div class="history-chart">
      <PieChart v-if="records.length" v-bind="pieChartProps" />
    </div>
    <Loader v-if="loading" />
    <div v-else-if="!records.length" class="center">
      <p>{{ $t("common.noRecords") }}</p>
      <router-link to="/record">{{ $t("common.addRecord") }}</router-link>
    </div>
    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="onChangePage"
        :prev-text="$t('common.back')"
        :next-text="$t('common.next')"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { Chart, registerables } from "chart.js";
import { PieChart, usePieChart } from "vue-chart-3";
import HistoryTable from "@/components/History/HistoryTable.vue";
import paginationMixin from "@/mixins/pagination.mixin";

Chart.register(...registerables);

export default defineComponent({
  name: "History",
  data() {
    return {
      loading: true,
      records: [],
    };
  },
  components: { HistoryTable, PieChart },
  mixins: [paginationMixin],
  async mounted() {
    this.records = await this.$store.dispatch("getRecords");
    const categories = await this.$store.dispatch("getCategories");
    this.setup(categories);
    this.loading = false;
  },
  setup() {
    const dataValues = ref([]);
    const dataLabels = ref([]);
    const chartLabel = ref("");

    const chartData = computed(() => ({
      labels: dataLabels.value,
      datasets: [
        {
          data: dataValues.value,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(15, 242, 201, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(15, 242, 201,1)",
          ],
          borderWidth: 1,
        },
      ],
    }));

    const options = computed(() => ({
      plugins: {
        title: {
          display: true,
          text: chartLabel.value,
        },
      },
    }));

    const { pieChartProps, pieChartRef } = usePieChart({
      chartData,
      options,
    });

    function loadChartData(categories) {
      dataValues.value = categories.map((c) => {
        return this.records.reduce((total, r) => {
          if (r.categoryId === c.id && r.type === "outcome") {
            total += +r.amount;
          }
          return total;
        }, 0);
      });
      dataLabels.value = categories.map((c) => c.title);
      chartLabel.value = this.$t("history.chartLabel");
    }

    return {
      chartData,
      options,
      pieChartRef,
      pieChartProps,
      loadChartData,
    };
  },

  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find(
              (category) => category.id === record.categoryId
            ).title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText:
              record.type === "income"
                ? this.$t("common.income")
                : this.$t("common.outcome"),
          };
        })
      );
      this.loadChartData(categories);
    },
  },
});
</script>
