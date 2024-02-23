<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{ $t("register.title") }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: v$.email.$error }"
        />
        <label for="email">{{ $t("register.email") }}</label>
        <small class="helper-text invalid" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message
        }}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          :class="{ invalid: v$.password.$error }"
          v-model.trim="password"
        />
        <label for="password">{{ $t("register.password") }}</label>
        <small class="helper-text invalid" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: v$.name.$error }"
        />
        <label for="name">{{ $t("register.name") }}</label>
        <small class="helper-text invalid" v-if="v$.name.$error">{{
          v$.name.$errors[0].$message
        }}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{ $t("register.agree") }}</span>
        </label>
      </p>
      <small class="helper-text invalid" v-if="v$.agree.$error">{{
        v$.agree.$errors[0].$message
      }}</small>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ $t("register.btnText") }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $t("register.haveAccount") }}
        <router-link to="/login">{{ $t("register.login") }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      email: {
        email: helpers.withMessage("Введите корректный Email", email),
        required: helpers.withMessage("Введите email", required),
      },
      password: {
        required: helpers.withMessage("Введите пароль", required),
        minLength: helpers.withMessage(
          ({ $params }) =>
            `Пароль должен быть не менее ${$params.min} символов`,
          minLength(6)
        ),
      },
      name: {
        required: helpers.withMessage("Введите имя", required),
        minLength: helpers.withMessage(
          ({ $params }) => `Имя должно быть не менее ${$params.min} символов`,
          minLength(2)
        ),
      },
      agree: {
        checked: helpers.withMessage(
          "Необходимо согласиться с правилами",
          (value) => value
        ),
      },
    };
  },
  methods: {
    async onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const body = {
          email: this.email,
          password: this.password,
          name: this.name,
        };

        try {
          await this.$store.dispatch("register", body);
          this.$router.push("/");
        } catch {}
      }
    },
  },
};
</script>

<style></style>
