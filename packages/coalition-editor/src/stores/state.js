import { defineStore } from "pinia";
import { ref } from "vue";
import { darkTheme } from "naive-ui";
import { WW2 } from "./lib";
export const useCoalitionStore = defineStore("coa", {
    state: () => ({
        coa: structuredClone(WW2),
    }),
    actions: {
        setAll(v) {
            this.coa = v;
        },
        getAll() {
            return this.coa;
        },
    },
});
const theme = ref(darkTheme);
const selectedTheme = ref("Dark");
const themeOverrides = {
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
        setTheme(newTheme) {
            theme.value = newTheme;
        },
        setThemeOverrides(newThemeOverrides) {
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
