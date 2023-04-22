<template>
  <div>
    <n-form-item label="Surface Winds">
      <div class="flex flex-row w-1/2">
        <n-input-number
          id="sfc-winds-input"
          class="w-3/5"
          @update:value="updateSfcWind"
          v-model:value="sfcwind"
          :min="0"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="sfc-winds-dir-input"
          v-model:value="sfcwinddir"
          @update:value="updateSfcWindDir"
          :min="0"
          :format="windDir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
    <n-form-item label="Winds at 2000">
      <div class="flex flex-row w-1/2">
        <n-input-number
          class="w-3/5"
          id="twok-wind-input"
          v-model:value="twokwind"
          @update:value="updateTwokWind"
          :min="0"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="twok-wind-dir-input"
          v-model:value="twokwinddir"
          @update:value="updateTwokWindDir"
          :min="0"
          :format="windDir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
    <n-form-item label="Winds at 8000">
      <div class="flex flex-row w-1/2">
        <n-input-number
          class="w-3/5"
          id="eightk-wind-input"
          v-model:value="eightkwind"
          @update:value="updateEightkWind"
          :min="0"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="eightk-wind-dir-input"
          v-model:value="eightkwinddir"
          @update:value="updateEightkWindDir"
          :min="0"
          :format="windDir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
    <n-divider class="divider w-1/2" />
    <n-form-item label="Turbulence">
      <n-input-number
        id="turbulence-input"
        class="w-1/2 min-w-24"
        v-model:value="turbulence"
        @update:value="updateTurbulence"
        size="small"
        :step="3"
        :min="0"
        :max="197"
      >
        <template #suffix> 0.1* ft</template>
      </n-input-number>
    </n-form-item>
  </div>
</template>

<script lang="ts">
import { NFormItem, NInputNumber, NDivider } from 'naive-ui'
import { computed, ref, watch } from 'vue'
import { useWeatherStore } from '../stores/state'

const windDir = (wind: number | null): string => {
  if (wind === null) {
    return ''
  } else if (wind > 359) {
    return '000'
  } else if (wind < 100) {
    let result = wind.toString().padStart(3, '0')
    return result
  } else {
    return wind.toString()
  }
}

export default {
  components: {
    NFormItem,
    NInputNumber,
    NDivider
  },
  setup() {
    const Weather = computed(() => useWeatherStore())

    const turbulence = ref(Weather.value.wx.groundTurbulence)
    const sfcwind = ref(Weather.value.wx.wind.atGround.speed)
    const sfcwinddir = ref(Weather.value.wx.wind.atGround.dir)
    const twokwind = ref(Weather.value.wx.wind.at2000.speed)
    const twokwinddir = ref(Weather.value.wx.wind.at2000.dir)
    const eightkwind = ref(Weather.value.wx.wind.at8000.speed)
    const eightkwinddir = ref(Weather.value.wx.wind.at8000.dir)

    const updateTurbulence = (value: number) => {
      Weather.value.wx.groundTurbulence = value
    }

    const updateSfcWind = (value: number) => {
      Weather.value.wx.wind.atGround.speed = value
    }

    const updateSfcWindDir = (value: number) => {
      Weather.value.wx.wind.atGround.dir = value
    }

    const updateTwokWind = (value: number) => {
      Weather.value.wx.wind.at2000.speed = value
    }

    const updateTwokWindDir = (value: number) => {
      Weather.value.wx.wind.at2000.dir = value
    }

    const updateEightkWind = (value: number) => {
      Weather.value.wx.wind.at8000.speed = value
    }

    const updateEightkWindDir = (value: number) => {
      Weather.value.wx.wind.at8000.dir = value
    }

    watch(
      () => Weather.value.wx.groundTurbulence,
      (newValue) => {
        turbulence.value = newValue
      }
    )

    watch(
      () => Weather.value.wx.wind.atGround.speed,
      (newValue) => {
        sfcwind.value = newValue
      }
    )

    watch(
      () => Weather.value.wx.wind.atGround.dir,
      (newValue) => {
        sfcwinddir.value = newValue
      }
    )

    watch(
      () => Weather.value.wx.wind.at2000.speed,
      (newValue) => {
        twokwind.value = newValue
      }
    )

    watch(
      () => Weather.value.wx.wind.at2000.dir,
      (newValue) => {
        twokwinddir.value = newValue
      }
    )

    watch(
      () => Weather.value.wx.wind.at8000.speed,
      (newValue) => {
        eightkwind.value = newValue
      }
    )

    watch(
      () => Weather.value.wx.wind.at8000.dir,
      (newValue) => {
        eightkwinddir.value = newValue
      }
    )

    return {
      updateTurbulence,
      updateSfcWind,
      updateSfcWindDir,
      updateTwokWind,
      updateTwokWindDir,
      updateEightkWind,
      updateEightkWindDir,
      windDir,
      turbulence,
      sfcwind,
      sfcwinddir,
      twokwind,
      twokwinddir,
      eightkwind,
      eightkwinddir
    }
  }
}
</script>
