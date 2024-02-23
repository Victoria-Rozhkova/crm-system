<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ $t("bill.billCurrency") }}</span>

        <p v-for="currency of currencies" :key="currency" class="currency-line">
          <span>{{ getCurrency(currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrencyFormat } from "@/utils/currency";

export default {
  props: ["rates"],
  data() {
    return { currencies: ["rub", "usd", "eur"] };
  },
  computed: {
    base() {
      return this.$store.getters.user.bill || 0;
    },
  },
  methods: {
    getCurrency(currency) {
      return getCurrencyFormat(this.base * this.rates[currency], currency);
    },
  },
};
</script>
