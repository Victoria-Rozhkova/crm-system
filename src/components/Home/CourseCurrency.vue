<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ $t("bill.courseCurrency.title") }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ $t("bill.courseCurrency.currency") }}</th>
              <th>{{ $t("bill.courseCurrency.course") }}</th>
              <th>{{ $t("bill.courseCurrency.date") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="currency of currencies" :key="currency">
              <td>{{ currency.toUpperCase() }}</td>
              <td>{{ rates[currency].toFixed(5) }}</td>
              <td>{{ getDate(date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getDateFormat } from "@/utils/date";

export default {
  props: ["rates", "date"],
  data() {
    return { currencies: ["rub", "usd", "eur"] };
  },
  computed: {
    locale() {
      return this.$store.getters.user.locale;
    },
  },
  methods: {
    getDate(date) {
      return getDateFormat(date, "dateshort", this.locale, {
        month: "numeric",
      });
    },
  },
};
</script>
