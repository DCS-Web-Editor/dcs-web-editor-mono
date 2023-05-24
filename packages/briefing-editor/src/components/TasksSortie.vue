<!-- Replace all inputs in prod with translated input from dcs-web-editor -->

<template>
  <n-input
    v-model:value="sortie"
    placeholder="Enter a sortie name"
    class="mb-8"
  />
  <n-grid :x-gap="14" :y-gap="50" :cols="2" class="pb-20">
    <n-grid-item>
      <n-h4>Situation</n-h4>
      <n-input
        v-model:value="situation"
        class="h-full"
        type="textarea"
        placeholder="Situation"
        :resizable="false"
      />
    </n-grid-item>
    <n-grid-item>
      <n-h4>Blue Coalition Tasks</n-h4>
      <n-input
        v-model:value="blueTasks"
        class="h-full"
        type="textarea"
        placeholder="Blue Coalition Tasks"
        :resizable="false"
      />
    </n-grid-item>
    <n-grid-item>
      <n-h4>Red Coalition Tasks</n-h4>
      <n-input
        v-model:value="redTasks"
        class="h-full"
        type="textarea"
        placeholder="Red Coalition Tasks"
        :resizable="false"
      />
    </n-grid-item>
    <n-grid-item>
      <n-h4>Neutral Coalition Tasks</n-h4>
      <n-input
        v-model:value="neutralTasks"
        class="h-full"
        type="textarea"
        placeholder="Neutral Coalition Tasks"
        :resizable="false"
      />
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { NInput, NGrid, NGridItem, NH4 } from "naive-ui";
import { useTxtState } from "../stores/txtState";
import { computed } from "vue";

const txt = useTxtState();
const sortie = computed({
  get: () => txt.txt.DictKey_sortie_5,
  set: (newValue) => {
    txt.txt.DictKey_sortie_5 = newValue;
  },
});

const situation = computed({
  get: () => txt.txt.DictKey_descriptionText_1,
  set: (newValue) => {
    txt.txt.DictKey_descriptionText_1 = newValue;
  },
});

const blueTasks = computed({
  get: () => txt.txt.DictKey_descriptionBlueTask_3,
  set: (newValue) => {
    txt.txt.DictKey_descriptionBlueTask_3 = newValue;
  },
});

const redTasks = computed({
  get: () => txt.txt.DictKey_descriptionRedTask_2,
  set: (newValue) => {
    txt.txt.DictKey_descriptionRedTask_2 = newValue;
  },
});

const neutralTasks = computed({
  get: () => txt.txt.DictKey_descriptionNeutralsTask_4,
  set: (newValue) => {
    txt.txt.DictKey_descriptionNeutralsTask_4 = newValue;
  },
});
</script>
