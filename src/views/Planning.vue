<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("planning.title") }}</h3>
      <h4>{{ getCurrency(user.bill) }}</h4>
    </div>
    <Loading v-if="loading" />
    <div v-else-if="!categories.length" class="center">
      <p>{{ $t("common.noCategories") }}</p>
      <router-link to="/categories">{{ $t("common.addCategory") }}</router-link>
    </div>
    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ getCurrency(category.spend) }} {{ $t("planning.out") }}
          {{ getCurrency(category.limit) }}
        </p>
        <div class="progress" v-tooltip="category.tooltipText">
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{ width: category.progress + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCurrencyFormat } from "@/utils/currency";

export default {
  name: "Planning",
  data() {
    return {
      loading: true,
      categories: [],
      records: [],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  async mounted() {
    const records = await this.$store.dispatch("getRecords");
    const categories = await this.$store.dispatch("getCategories");

    this.categories = categories.map((category) => {
      const spend = records
        .filter((record) => record.categoryId === category.id)
        .filter((record) => record.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);

      const percent = (100 * spend) / category.limit;
      const progress = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      const tooltipValue = category.limit - spend;
      const tooltipText = `${
        tooltipValue < 0
          ? this.$t("planning.tooltipText.excess")
          : this.$t("planning.tooltipText.left")
      } ${getCurrencyFormat(Math.abs(tooltipValue))}`;

      return { ...category, progress, spend, progressColor, tooltipText };
    });

    this.loading = false;
  },
  methods: {
    getCurrency(bill) {
      return getCurrencyFormat(bill);
    },
  },
};
</script>

<style></style>
