import { computed } from "vue";
import { useWeatherStore } from "./state";
export const inputWeather = (input) => {
    const useWeather = computed(() => useWeatherStore());
    useWeather.value.setAll(input);
};
