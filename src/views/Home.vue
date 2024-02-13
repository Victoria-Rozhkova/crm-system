<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons" @click="refresh">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <BillCurrency :rates="currency.rub" />
      <CourseCurrency :rates="currency.rub" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import BillCurrency from "@/components/Home/BillCurrency.vue";
import CourseCurrency from "@/components/Home/CourseCurrency.vue";

export default {
  name: "Home",
  components: {
    BillCurrency,
    CourseCurrency,
  },
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
  mounted() {
    this.getCurrency();
  },
  methods: {
    async getCurrency() {
      this.currency = await this.$store.dispatch("getCurrency");
      this.loading = false;
    },
    refresh() {
      this.loading = true;
      setTimeout(async () => {
        this.getCurrency();
      }, 1000);
    },
  },
};
</script>

<style></style>
