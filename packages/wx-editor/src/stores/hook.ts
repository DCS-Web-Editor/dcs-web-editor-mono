import { computed } from "vue";
import { useWeatherStore } from "./state";
import type { TWeather } from "./utils/wxtypes";

export const inputWeather = (input: TWeather) => {
  const useWeather = computed(() => useWeatherStore());

  useWeather.value.setAll(input);
};
