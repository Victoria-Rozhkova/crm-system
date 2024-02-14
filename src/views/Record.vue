<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading" />
    <div v-else-if="!categories.length" class="center">
      <p>Категорий пока нет</p>
      <router-link to="/categories">Добавить новую категорию</router-link>
    </div>
    <form v-else class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          step="any"
          v-model.number="amount"
          :class="{ invalid: v$.amount.$error }"
        />
        <label for="amount">Сумма</label>
        <small class="helper-text invalid" v-if="v$.amount.$error">{{
          v$.amount.$errors[0].$message
        }}</small>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: v$.description.$error }"
        />
        <label for="description">Описание</label>
        <small class="helper-text invalid" v-if="v$.description.$error">{{
          v$.description.$errors[0].$message
        }}</small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import messages from "@/utils/messages";

export default {
  name: "Record",
  data() {
    return {
      loading: true,
      categories: [],
      category: null,
      select: null,
      type: "outcome",
      amount: 50,
      description: "",
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations: {
    amount: {
      required: helpers.withMessage("Введите сумму", required),
      minValue: helpers.withMessage(
        ({ $params }) => `Сумма должна быть не менее ${$params.min}`,
        minValue(50)
      ),
    },
    description: {
      required: helpers.withMessage("Введите описание", required),
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("getCategories");
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(["user"]),
    isCanAddRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.user.bill >= this.amount;
    },
  },
  methods: {
    async onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const body = {
          categoryId: this.category,
          type: this.type,
          amount: this.amount,
          description: this.description,
          date: new Date().toJSON(),
        };
        if (this.isCanAddRecord) {
          try {
            await this.$store.dispatch("addRecord", body);
            const newBill =
              this.type === "income"
                ? this.user.bill + this.amount
                : this.user.bill - this.amount;
            await this.$store.dispatch("updateUser", {
              bill: newBill,
            });
            this.$message(messages["add-record"]);
            this.v$.$reset();
            this.amount = 50;
            this.description = "";
          } catch {}
        } else {
          this.$error(
            `Недостаточно средств на счете (${this.amount - this.user.bill})`
          );
        }
      }
    },
  },
  beforeUnmount() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style></style>
