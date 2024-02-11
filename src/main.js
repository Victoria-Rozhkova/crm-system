import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import messagePlugin from "./utils/message.plugin";
import "materialize-css/dist/js/materialize.min.js";

const app = createApp(App);

app.use(messagePlugin);
app.use(router);

app.mount("#app");
