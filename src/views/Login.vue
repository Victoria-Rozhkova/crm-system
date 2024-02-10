<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          :class="{ invalid: v$.email.$error }"
          v-model.trim="email"
        />
        <label for="email">Email</label>
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
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
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
    };
  },
  methods: {
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const body = { email: this.email, password: this.password };
        console.log(body);
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
