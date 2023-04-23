<template>
  <n-space vertical>
    <n-form-item :label="labelText" label-style="color: white">
      <n-slider
        v-model:value="value"
        :on-update:value="update"
        :step="1"
        :min="min"
        :max="max"
        :disabled="disabled"
        class="mr-4 ml-0 w-52"
      />
      <n-input-number
        v-model:value="value"
        size="small"
        class="min-w-44 w-52"
        :disabled="disabled"
      >
        <template #suffix>{{ suffix }}</template>
      </n-input-number>
    </n-form-item>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NInputNumber, NSlider, NSpace, NFormItem } from 'naive-ui'

export default defineComponent({
  props: {
    labelText: {
      type: String,
      default: 'Give it a name'
    },
    suffix: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 18000
    },
    min: {
      type: Number,
      default: 0
    },
    val: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const value = ref(props.val)

    return {
      value
    }
  },
  components: {
    NInputNumber,
    NSlider,
    NSpace,
    NFormItem
  },
  methods: {
    update(newValue: number) {
      this.value = newValue
      this.$emit('update-value', newValue)
    }
  },
  emits: ['update-value']
})
</script>
