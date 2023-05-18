import { defineStore } from "pinia";
import { ref } from "vue";
import { darkTheme } from "naive-ui";
import type { GlobalTheme, GlobalThemeOverrides } from "naive-ui";

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
