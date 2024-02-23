<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $t("history.table.amount") }}</th>
        <th>{{ $t("history.table.date") }}</th>
        <th>{{ $t("history.table.category") }}</th>
        <th>{{ $t("history.table.type") }}</th>
        <th>{{ $t("history.table.open") }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) of records" :key="record.id">
        <td>{{ index + 1 }}</td>
        <td>{{ getCurrency(record.amount) }}</td>
        <td>{{ getDate(record.date) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="record.typeClass">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push(`/detail/${record.id}`)"
            v-tooltip="$t('history.table.watchRecord')"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getDateFormat } from "@/utils/date";
import { getCurrencyFormat } from "@/utils/currency";

export default {
  name: "HistoryTable",
  props: ["records"],
  computed: {
    locale() {
      return this.$store.getters.user.locale;
    },
  },
  methods: {
    getDate(date) {
      return getDateFormat(date, "dateshort",this.locale);
    },
    getCurrency(amount) {
      return getCurrencyFormat(amount);
    },
  },
};
</script>
