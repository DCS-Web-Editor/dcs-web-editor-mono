<template>
  <n-config-provider
    :theme="selectedTheme === 'Dark' ? theme : null"
    :theme-overrides="selectedTheme === 'Dark' ? themeOverrides : null"
  >
    <CoalitionComponent />
  </n-config-provider>
</template>

<script lang="ts">
import type { GlobalTheme, GlobalThemeOverrides } from "naive-ui";
import { NConfigProvider } from "naive-ui";
import CoalitionComponent from "./components/CoalitionComponent.vue";
import { useThemeStore } from "./stores/state";
import { ref } from "vue";
export default {
  setup() {
    const themeStore = useThemeStore();
    const theme = ref<GlobalTheme>(themeStore.theme);
    const selectedTheme = ref<string>(themeStore.getSelectedTheme);
    const themeOverrides = ref<GlobalThemeOverrides>(
      themeStore.getThemeOverrides
    );

    const setThemeOverrides = (overrides: GlobalThemeOverrides) => {
      themeStore.setThemeOverrides(overrides);
    };

    return {
      theme,
      selectedTheme,
      themeOverrides,
      setThemeOverrides,
    };
  },
  components: {
    NConfigProvider,
    CoalitionComponent,
  },
};
</script>
