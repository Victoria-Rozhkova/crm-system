<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
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
        <div class="input-field">
          <input
            id="title"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$error }"
          />
          <label for="title">Название</label>
          <small class="helper-text invalid" v-if="v$.title.$error">{{
            v$.title.$errors[0].$message
          }}</small>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="limit">Лимит</label>
          <small class="helper-text invalid" v-if="v$.limit.$error">{{
            v$.limit.$errors[0].$message
          }}</small>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";
import messages from "@/utils/messages";

export default {
  props: ["categories"],
  data() {
    return {
      title: "",
      limit: 50,
      current: null,
      select: null,
    };
  },
  watch: {
    current(categoryId) {
      const { title, limit } = this.categories.find(
        (category) => category.id === categoryId
      );
      this.title = title;
      this.limit = limit;
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations: {
    title: { required: helpers.withMessage("Введите название", required) },
    limit: {
      required: helpers.withMessage("Введите минимальное значение", required),
      minValue: helpers.withMessage(
        ({ $params }) =>
          `Минимальное значение должно быть не менее ${$params.min}`,
        minValue(50)
      ),
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();
  },
  methods: {
    async onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const body = { id: this.current, title: this.title, limit: this.limit };
        try {
          await this.$store.dispatch("editCategory", body);
          this.$message(messages["edit-category"]);
          this.$emit("edit", body);
        } catch (error) {}
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
