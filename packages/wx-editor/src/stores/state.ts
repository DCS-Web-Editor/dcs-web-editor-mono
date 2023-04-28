import { defineStore } from "pinia";
import { ref } from "vue";
import { darkTheme } from "naive-ui";
import type { GlobalTheme, GlobalThemeOverrides } from "naive-ui";
import { Weather } from "./utils/weather";
import type { TWeather } from "./utils/wxtypes";

const theme = ref<GlobalTheme>(darkTheme);
const selectedTheme = ref("Dark");
const themeOverrides: GlobalThemeOverrides = {
  common: {
    bodyColor: "#23313f",
    cardColor: "#293949",
    railColor: "#555",
    primaryColorSuppl: "#fff",
  },
};

export const useWeatherStore = defineStore("wx", {
  state: () => ({
    wx: Weather,
  }),
  actions: {
    setAll(input: TWeather) {
      this.wx = input;
    },
  },
  getters: {
    getWx(): TWeather {
      return this.wx;
    },
  },
});

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: darkTheme,
  }),
  actions: {
    setTheme(newTheme: GlobalTheme) {
      theme.value = newTheme;
    },
    setThemeOverrides(newThemeOverrides: GlobalThemeOverrides) {
      themeOverrides.common = newThemeOverrides.common;
    },
  },
  getters: {
    getTheme() {
      return theme.value;
    },
    getThemeOverrides() {
      return themeOverrides;
    },
    getSelectedTheme() {
      return selectedTheme.value;
    },
  },
});
