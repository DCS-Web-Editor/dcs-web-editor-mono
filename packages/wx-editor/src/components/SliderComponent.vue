<template>
  <n-space vertical>
    <n-form-item :label="labelText" label-style="color: white">
      <n-slider
        v-model:value="value"
        :step="1"
        :min="min"
        :max="max"
        :disabled="disabled"
        class="mr-4 ml-0 w-52"
        @update:value="onInput"
      />
      <n-input-number
        v-model:value="value"
        :step="1"
        :min="min"
        :max="max"
        size="small"
        class="min-w-44 w-52"
        :disabled="disabled"
        @update:value="onInput"
      >
        <template #suffix>{{ suffix }}</template>
      </n-input-number>
    </n-form-item>
  </n-space>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { NInputNumber, NSlider, NSpace, NFormItem } from "naive-ui";

const emit = defineEmits(["update"]);

const props = defineProps({
  labelText: {
    type: String,
    default: "",
  },
  suffix: {
    type: String,
    default: "",
  },
  max: {
    type: Number,
    default: 18000,
  },
  min: {
    type: Number,
    default: 0,
  },
  val: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const value = ref(props.val);

watch(
  () => props.val,
  (newVal) => {
    value.value = newVal;
  }
);

const onInput = () => {
  emit("update", value.value);
};
</script>
