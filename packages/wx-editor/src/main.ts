import { createApp } from "vue";
import { useWeatherStore } from "./stores/state";
import { inputWeather } from "./stores/hook";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

app.mount("#app");

export { useWeatherStore, inputWeather };
