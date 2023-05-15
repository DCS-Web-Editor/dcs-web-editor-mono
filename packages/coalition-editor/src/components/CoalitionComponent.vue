<template>
  <div class="w-full h-full">
    <div class="flex flex-row justify-center p-5 relative">
      <n-tooltip trigger="hover" class="w-full">
        <template #trigger>
          <n-select
            v-model:value="preset"
            :options="preset_options"
            class="absolute left-0 ml-5 w-1/4"
          />
        </template>
        {{ tooltip }}
      </n-tooltip>
      <button @click="handleLeftArrowClick" :disabled="leftDisabled">
        <n-icon size="35">
          <img src="/editor/leftarrow.svg" />
        </n-icon>
      </button>
      <button @click="handleCircleClick" :disabled="circleDisabled">
        <n-icon size="35">
          <img src="/editor/circle.svg" />
        </n-icon>
      </button>
      <button @click="handleRightArrowClick" :disabled="rightDisabled">
        <n-icon size="35">
          <img src="/editor/rightarrow.svg" />
        </n-icon>
      </button>
    </div>
    <div class="m-5">
      <div class="flex">
        <div class="w-1/2 mr-4">
          <n-h3 class="mb-3 text-lg">Red</n-h3>
          <ul
            class="list-none border border-gray-300 p-6 pl-4 rounded-lg overflow-y-auto max-h-80"
          >
            <li
              v-for="(option, index) in sorted_red"
              :key="index"
              class="mb-2 cursor-pointer rounded text-sm"
              :class="{
                'bg-blue-200 pl-2 text-black text-sm':
                  currentSelection.list === 'red' &&
                  currentSelection.index === index,
              }"
              @click="handleItemClick('red', index)"
            >
              {{ findCountryByValue(option) }}
            </li>
          </ul>
        </div>
        <div class="w-1/3 mr-4 text-sm">
          <n-h3 class="mb-3 text-lg">Neutral</n-h3>
          <ul
            class="list-none border border-gray-300 p-6 pl-4 rounded-lg overflow-y-auto max-h-80"
          >
            <li
              v-for="(option, index) in sorted_neutral"
              :key="index"
              class="mb-2 cursor-pointer rounded text-sm"
              :class="{
                'bg-blue-200 pl-2 text-black text-sm':
                  currentSelection.list === 'neutral' &&
                  currentSelection.index === index,
              }"
              @click="handleItemClick('neutral', index)"
            >
              {{ findCountryByValue(option) }}
            </li>
          </ul>
        </div>
        <div class="w-1/2">
          <n-h3 class="mb-3 text-lg">Blue</n-h3>
          <ul
            class="list-none border border-gray-300 p-6 pl-4 rounded-lg overflow-y-auto max-h-80"
          >
            <li
              v-for="(option, index) in sorted_blue"
              :key="index"
              class="mb-2 cursor-pointer rounded text-sm"
              :class="{
                'bg-blue-200 pl-2 text-black text-sm':
                  currentSelection.list === 'blue' &&
                  currentSelection.index === index,
              }"
              @click="handleItemClick('blue', index)"
            >
              {{ findCountryByValue(option) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import { NIcon, NSelect, NTooltip, NH3 } from "naive-ui";
import { ColdWar, Modern, WW2, countries } from "../stores/lib";
import type TCoalitions from "../types";
import { useCoalitionStore } from "../stores/state";
import { watch } from "vue";

interface ListMapping {
  [key: string]: {
    list: Ref<number[]>;
    sortedList: Ref<number[]>;
  };
}

const coaStore = useCoalitionStore();

const tooltip = "Select a coalition preset";

const red = computed(() => coaStore.coa.red);
const blue = computed(() => coaStore.coa.blue);
const neutral = computed(() => coaStore.coa.neutrals);

const currentSelection = ref<{ list: string; index: number }>({
  list: "red",
  index: 0,
});

const findCountryByValue = (value: number): string | null => {
  const country = countries.find((country) => country.value === value);
  return country ? country.label : null;
};

const handleItemClick = (list: string, index: number) => {
  currentSelection.value.list = list;
  currentSelection.value.index = index;
};

const moveItem = (fromList: string, toList: string, condition: boolean) => {
  if (!condition) {
    return;
  }

  const listMapping: ListMapping = {
    red: {
      list: red,
      sortedList: sorted_red,
    },
    blue: {
      list: blue,
      sortedList: sorted_blue,
    },
    neutral: {
      list: neutral,
      sortedList: sorted_neutral,
    },
  };

  const fromListData = listMapping[fromList];
  const toListData = listMapping[toList];

  const selectedItem =
    fromListData.sortedList.value[currentSelection.value.index];
  const originalIndex = fromListData.list.value.indexOf(selectedItem);

  const option = fromListData.list.value.splice(originalIndex, 1)[0];
  toListData.list.value.push(option);

  currentSelection.value.list = toList;
  currentSelection.value.index = -1;
};

const handleLeftArrowClick = () => {
  moveItem(
    "blue",
    "red",
    currentSelection.value.list === "blue" &&
      currentSelection.value.index >= 0 &&
      blue.value.length > 0
  );
  moveItem(
    "neutral",
    "red",
    currentSelection.value.list === "neutral" &&
      currentSelection.value.index >= 0 &&
      neutral.value.length > 0
  );
};

const handleRightArrowClick = () => {
  moveItem(
    "red",
    "blue",
    currentSelection.value.list === "red" &&
      currentSelection.value.index >= 0 &&
      red.value.length > 0
  );
  moveItem(
    "neutral",
    "blue",
    currentSelection.value.list === "neutral" &&
      currentSelection.value.index >= 0 &&
      neutral.value.length > 0
  );
};

const handleCircleClick = () => {
  moveItem(
    "red",
    "neutral",
    currentSelection.value.list === "red" &&
      currentSelection.value.index >= 0 &&
      red.value.length > 0
  );
  moveItem(
    "blue",
    "neutral",
    currentSelection.value.list === "blue" &&
      currentSelection.value.index >= 0 &&
      blue.value.length > 0
  );
};

const sorted = (src: Ref<number[]>) => {
  return src.value.slice().sort((a, b) => a - b);
};

const sorted_red = computed(() => sorted(red));
const sorted_blue = computed(() => sorted(blue));
const sorted_neutral = computed(() => sorted(neutral));

const customCoalitions = computed<TCoalitions>(() => ({
  red: sorted_red.value,
  neutrals: sorted_neutral.value,
  blue: sorted_blue.value,
}));

const preset = computed({
  get() {
    if (JSON.stringify(coaStore.coa) === JSON.stringify(Modern)) {
      return "Modern";
    } else if (JSON.stringify(coaStore.coa) === JSON.stringify(ColdWar)) {
      return "ColdWar";
    } else if (JSON.stringify(coaStore.coa) === JSON.stringify(WW2)) {
      return "WW2";
    } else {
      return "Custom";
    }
  },
  set(val) {
    if (val === "Modern") {
      coaStore.setAll(structuredClone(Modern));
    } else if (val === "ColdWar") {
      coaStore.setAll(structuredClone(ColdWar));
    } else if (val === "WW2") {
      coaStore.setAll(structuredClone(WW2));
    } else {
      preset.value = "Custom";
      coaStore.setAll(structuredClone(customCoalitions.value));
    }
  },
});

const preset_options = [
  { label: "Modern", value: "Modern" },
  { label: "Cold War 1947-1991", value: "ColdWar" },
  { label: "WWII", value: "WW2" },
  { label: "Custom", value: "Custom" },
];

const leftDisabled = ref(true);
const circleDisabled = ref(false);
const rightDisabled = ref(false);

const checkDisabledButton = (value: string) => {
  if (value === "red") {
    leftDisabled.value = true;
    circleDisabled.value = false;
    rightDisabled.value = false;
  } else if (value === "neutral") {
    leftDisabled.value = false;
    circleDisabled.value = true;
    rightDisabled.value = false;
  } else if (value === "blue") {
    leftDisabled.value = false;
    circleDisabled.value = false;
    rightDisabled.value = true;
  }
};

watch(() => currentSelection.value.list, checkDisabledButton);
</script>
