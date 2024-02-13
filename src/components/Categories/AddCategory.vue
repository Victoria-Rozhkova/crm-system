<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$error }"
          />
          <label for="name">Название</label>
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
          Создать
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
  data() {
    return {
      title: "",
      limit: 50,
    };
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
  mounted() {
    window.M.updateTextFields();
  },
  methods: {
    async onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const body = { title: this.title, limit: this.limit };
        try {
          const category = await this.$store.dispatch("addCategory", body);
          console.log(category);
          this.clearForm();
          this.$message(messages["add-category"]);
          this.$emit("add", category);
        } catch (error) {}
      }
    },

    clearForm() {
      this.title = "";
      this.limit = 50;
      this.v$.$reset();
    },
  },
};
</script>
