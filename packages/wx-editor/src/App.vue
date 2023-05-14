<template>
  <n-config-provider
    :theme="selectedTheme === 'Dark' ? theme : null"
    :theme-overrides="selectedTheme === 'Dark' ? themeOverrides : null"
  >
    <div class="flex flex-row w-full text-xl mt-2 font-sans font-semibold">
      <div
        class="flex justify-center flex-col w-1/2 h-full overflow-hidden pl-10"
      >
        <n-h3 class="border-b border-white border-solid border-1 mb-12">
          Clouds & Atmosphere
        </n-h3>
        <AtmosphereClouds />
      </div>
      <div
        class="flex justify-center flex-col w-1/2 h-full overflow-hidden pl-8 pr-10 ml-8"
      >
        <n-h3 class="border-b border-white border-solid border-1 mb-12"
          >Wind</n-h3
        >
        <WindConditions />
      </div>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import AtmosphereClouds from "./components/AtmosphereClouds.vue";
import WindConditions from "./components/WindConditions.vue";
import type { GlobalTheme, GlobalThemeOverrides } from "naive-ui";
import { NConfigProvider, NH3 } from "naive-ui";
import { useThemeStore } from "./stores/state";
import { ref } from "vue";

const themeStore = useThemeStore();
const theme = ref<GlobalTheme>(themeStore.theme);
const selectedTheme = ref<string>(themeStore.getSelectedTheme);
const themeOverrides = ref<GlobalThemeOverrides>(themeStore.getThemeOverrides);
</script>
