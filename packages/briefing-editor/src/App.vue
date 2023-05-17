<template>
  <n-config-provider
    :theme="selectedTheme === 'Dark' ? theme : null"
    :theme-overrides="selectedTheme === 'Dark' ? themeOverrides : null"
  >
    <div class="flex flex-row w-full text-xl mt-2 font-sans font-semibold pr-10">
      <div
        class="flex justify-center flex-col w-full h-full overflow-hidden pl-10"
      >
        <n-h3 class="border-b border-white border-solid border-1 mb-12">
          Briefing
        </n-h3>
        <tasks-sortie />
      </div>
      <div
        class="flex justify-center flex-col w-1/2 h-full overflow-hidden pl-8 pr-10 ml-8"
      >
        <n-h3 class="border-b border-white border-solid border-1 mb-12"
          >Briefing Images</n-h3
        >
        <image-upload />
      </div>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import type { GlobalTheme, GlobalThemeOverrides } from "naive-ui";
import TasksSortie from "./components/TasksSortie.vue";
import ImageUpload from "./components/ImageUpload.vue";
import { NConfigProvider } from "naive-ui";
import { useThemeStore } from "./stores/theme";
import { ref } from "vue";

const themeStore = useThemeStore();
const theme = ref<GlobalTheme>(themeStore.theme);
const selectedTheme = ref<string>(themeStore.getSelectedTheme);
const themeOverrides = ref<GlobalThemeOverrides>(themeStore.getThemeOverrides);
</script>
