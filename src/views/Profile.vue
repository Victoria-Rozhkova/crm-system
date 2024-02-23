<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("profile.title") }}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="name"
          :class="{ invalid: v$.name.$error }"
        />
        <label for="description">{{ $t("profile.label") }}</label>
        <small class="helper-text invalid" v-if="v$.name.$error">{{
          v$.name.$errors[0].$message
        }}</small>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ $t("profile.btnText") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import messages from "@/utils/messages";

export default {
  name: "Profile",
  data() {
    return {
      name: "",
      isRuLocale: true,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.name = this.user.name;
    this.isRuLocale = this.user.locale === "ru-RU";
    setTimeout(() => {
      window.M.updateTextFields();
    }, 0);
  },
  validations() {
    return {
      name: {
        required: helpers.withMessage("Введите имя", required),
        minLength: helpers.withMessage(
          ({ $params }) => `Имя должно быть не менее ${$params.min} символов`,
          minLength(2)
        ),
      },
    };
  },
  methods: {
    ...mapActions(["updateUser"]),
    async onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const body = {
          name: this.name,
          locale: this.isRuLocale ? "ru-RU" : "en-US",
        };
        this.$i18n.locale = this.isRuLocale ? "ru-RU" : "en-US";
        try {
          await this.updateUser(body);
          this.$message(messages.profileUpdate);
        } catch {}
      }
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
