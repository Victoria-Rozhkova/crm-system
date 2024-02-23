<template>
  <div>
    <Loader v-if="loading" />
    <NotFound v-else-if="!record" :text="$t('detail.error')" />
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          $t("detail.breadcrumb.history")
        }}</router-link>
        <a @click.prevent class="breadcrumb"> {{ record.typeText }} </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.typeClass">
            <div class="card-content white-text">
              <p>{{ $t("detail.description") }} {{ record.description }}</p>
              <p>{{ $t("detail.amount") }} {{ getCurrency(record.amount) }}</p>
              <p>{{ $t("detail.category") }} {{ record.categoryName }}</p>
              <small>{{ getDate(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDateFormat } from "@/utils/date";
import { getCurrencyFormat } from "@/utils/currency";
import NotFound from "./NotFound.vue";

export default {
  name: "Detail",
  components: { NotFound },
  data() {
    return {
      loading: true,
      record: null,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("getRecordById", id);
    const category = await this.$store.dispatch(
      "getCategoryById",
      record.categoryId
    );
    this.record = {
      ...record,
      categoryName: category.title,
      typeText:
        record.type === "outcome"
          ? this.$t("common.outcome")
          : this.$t("common.income"),
      typeClass: record.type === "outcome" ? "red" : "green",
    };

    this.loading = false;
  },
  methods: {
    getDate(date) {
      return getDateFormat(date, "datedot");
    },
    getCurrency(amount) {
      return getCurrencyFormat(amount);
    },
  },
};
</script>
