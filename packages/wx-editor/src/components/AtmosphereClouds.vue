<template>
  <div class="flex flex-row">
    <n-space vertical class="mr-6 w-full">
      <n-form-item label="Temperature" label-style="color: white">
        <n-input-number
          id="temperature-input"
          @update:value="updateTemp"
          :min="8.4"
          :max="50"
          v-model:value="temp"
          class="w-full min-w-24"
          size="small"
        >
          <template #suffix> °C </template>
        </n-input-number>
      </n-form-item>
      <n-divider class="divider" />
      <n-form-item label="Pressure" label-style="color: white">
        <n-input-number
          id="pressure-input"
          v-model:value="pressure"
          @update:value="updatePressure"
          class="w-full min-w-24"
          size="small"
          :step="0.01"
          :min="28.35"
          :max="31.01"
          :precision="2"
        >
          <template #suffix> inHg </template>
        </n-input-number>
      </n-form-item>
      <n-divider class="divider" />
      <n-form-item label="Ice Halo" label-style="color: white">
        <n-select
          class="w-full"
          v-model:value="halo_preset"
          :options="halo_options"
          @update:value="updateHaloPreset"
        />
      </n-form-item>
      <div v-if="halo_preset !== 'off' && halo_preset !== 'auto'">
        <n-form-item label="Halo Preset" label-style="color: white">
          <n-select
            class="w-full"
            @update:value="updateHaloCrystalPreset"
            v-model:value="halo_crystal_preset"
            :options="crystal_options"
          />
        </n-form-item>
      </div>
      <n-divider class="divider" />
      <n-checkbox
        v-model:checked="isFogEnabled"
        @update:checked="updateToggleFog"
        >Toggle Fog</n-checkbox
      >
      <SliderComponent
        labelText="Fog Visibility"
        v-model:value="fog_visibility"
        @update-value="updateFogVis"
        class="mt-2 w-full"
        suffix="ft"
        :max="19685"
        :disabled="!isFogEnabled"
      />
      <SliderComponent
        labelText="Fog Thickness"
        v-model:value="fog_thickness"
        @update-value="updateFogThickness"
        class="w-full"
        suffix="ft"
        :max="3281"
        :disabled="!isFogEnabled"
      />
    </n-space>
    <n-space vertical class="ml-8 w-full">
      <n-form-item label="Cloud Preset" label-style="color: white">
        <n-tooltip trigger="hover" class="w-full">
          <template #trigger>
            <n-select
              class="w-full"
              v-model:value="cloud_preset"
              @update:value="updateCloudPreset"
              :options="cloud_options"
            />
          </template>
          {{ tooltip }}
        </n-tooltip>
      </n-form-item>
      <n-divider class="divider" />
      <SliderComponent
        labelText="Cloud Base"
        :val="cloud_base"
        :min="preset_min"
        :max="preset_max"
        suffix="ft"
        @update-value="updateCloudBase"
      />
      <div v-if="cloud_preset === 'Nothing'">
        <SliderComponent
          labelText="Cloud Thickness"
          @update-value="updateCloudThickness"
          :val="cloud_thickness"
          suffix="ft"
        />
        <n-form-item label="Density" label-style="color: white">
          <n-input-number
            id="cloud-thickness-input"
            class="w-full min-w-24"
            v-model:value="cloud_density"
            @update:value="updateCloudDensity"
            size="small"
            :min="0"
            :max="10"
          />
        </n-form-item>
        <div v-if="cloud_density >= 5">
          <n-form-item label="Precipitation" label-style="color: white">
            <n-select
              class="w-full"
              v-model:value="precip"
              @update:value="updatePrecip"
              :options="precip_options"
            />
          </n-form-item>
        </div>
        <n-divider class="divider" />
      </div>
      <n-checkbox
        v-model:checked="isDustSmokeEnabled"
        @update:checked="updateToggleDust"
      >
        Toggle Dust/Smoke
      </n-checkbox>
      <SliderComponent
        labelText="Dust Smoke Visibility"
        :val="dust_smoke_visibility"
        @update-value="updateDustVis"
        suffix="ft"
        class="mt-2"
        :min="984"
        :max="9843"
        :disabled="!isDustSmokeEnabled"
      />
    </n-space>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import SliderComponent from './SliderComponent.vue'
import {
  NFormItem,
  NInputNumber,
  NSelect,
  NCheckbox,
  NDivider,
  NSpace,
  NTooltip
} from 'naive-ui'
import { mmHgToinHG, inHgTommHG, MToft } from '../libs/convert'
import { useWeatherStore } from '../stores/state'
import { computed } from 'vue'

export default {
  data() {
    return {}
  },
  setup() {
    const Weather = computed(() => useWeatherStore())

    const cloud_preset = Weather.value.wx.clouds.preset
      ? ref(Weather.value.wx.clouds.preset)
      : ref('Nothing')
    const cloud_base = ref(MToft(Weather.value.wx.clouds.base))
    const cloud_thickness = ref(
      MToft(
        Weather.value.wx.clouds.thickness
          ? Weather.value.wx.clouds.thickness
          : 0
      )
    )
    const cloud_density = ref(
      Weather.value.wx.clouds.density
        ? ref(Weather.value.wx.clouds.density)
        : ref(0)
    )
    const precip = ref(Weather.value.wx.clouds.iprecptns)
      ? ref(Weather.value.wx.clouds.iprecptns)
      : ref(0)
    const isDustSmokeEnabled = ref(Weather.value.wx.enable_dust)
    const dust_smoke_visibility = ref(MToft(Weather.value.wx.dust_density))
    const isFogEnabled = ref(Weather.value.wx.enable_fog)
    const fog_thickness = ref(MToft(Weather.value.wx.fog.thickness))
    const fog_visibility = ref(MToft(Weather.value.wx.fog.visibility))
    const temp = ref(Weather.value.wx.season.temperature)
    const pressure = ref(mmHgToinHG(Weather.value.wx.qnh))
    const halo_preset = ref(Weather.value.wx.halo.preset)
    const halo_crystal_preset = ref(Weather.value.wx.halo.crystalsPreset)
    const tooltip = ref('Nothing')
    const preset_min = ref(0)
    const preset_max = ref(0)

    const updateTemp = (value: number) => {
      Weather.value.wx.season.temperature = value
    }

    const updateHaloPreset = (value: string) => {
      Weather.value.wx.halo.preset = value
    }

    const updateHaloCrystalPreset = (value: string) => {
      Weather.value.wx.halo.crystalsPreset = value
    }
    const updateCloudPreset = (value: string) => {
      Weather.value.wx.clouds.preset = value === 'Nothing' ? undefined : value
      updateCloudBaseMinMax(value === undefined ? 'Nothing' : value)
    }

    const updateCloudDensity = (value: number) => {
      Weather.value.wx.clouds.density =
        Weather.value.wx.clouds.density !== undefined ? value : 0
    }

    const updateToggleDust = (value: boolean) => {
      Weather.value.wx.enable_dust = value
    }

    const updateToggleFog = (value: boolean) => {
      Weather.value.wx.enable_fog = value
    }

    const updatePressure = (value: number) => {
      Weather.value.wx.qnh = inHgTommHG(value)
    }

    const updatePrecip = (value: number) => {
      Weather.value.wx.clouds.iprecptns = value
    }

    function updateCloudBaseMinMax(value: string) {
      switch (value) {
        case 'Nothing':
          preset_min.value = 984
          preset_max.value = 16404
          tooltip.value = 'Nothing'
          break
        case 'Preset1':
          preset_min.value = 2756
          preset_max.value = 13780
          tooltip.value = 'Few Scattered'
          break
        case 'Preset2':
          preset_min.value = 4134
          preset_max.value = 8268
          tooltip.value = 'Two Layers Few Scattered'
          break
        case 'Preset3':
          preset_min.value = 2756
          preset_max.value = 8268
          tooltip.value = 'Two Layers Scattered'
          break
        case 'Preset4':
          preset_min.value = 4134
          preset_max.value = 8268
          tooltip.value = 'Two Layers Scattered'
          break
        case 'Preset5':
          preset_min.value = 4134
          preset_max.value = 15157
          tooltip.value = 'Three Layers High Scattered'
          break
        case 'Preset6':
          preset_min.value = 4134
          preset_max.value = 13780
          tooltip.value = 'One Layer Scattered/Broken'
          break
        case 'Preset7':
          preset_min.value = 5512
          preset_max.value = 16535
          tooltip.value = 'Two Layers Scattered/Broken'
          break
        case 'Preset8':
          preset_min.value = 12402
          preset_max.value = 17913
          tooltip.value = 'Two High Layers Scattered/Broken'
          break
        case 'Preset9':
          preset_min.value = 5512
          preset_max.value = 12402
          tooltip.value = 'Two Layers Scattered/Broken'
          break
        case 'Preset10':
          preset_min.value = 4134
          preset_max.value = 13780
          tooltip.value = 'Two Layers Large Thick Clouds'
          break
        case 'Preset11':
          preset_min.value = 8268
          preset_max.value = 17913
          tooltip.value = 'Two Layers Large Clouds High Ceiling'
          break
        case 'Preset12':
          preset_min.value = 5512
          preset_max.value = 11024
          tooltip.value = 'Two Layers Scattered Large Clouds High Ceiling'
          break
        case 'Preset13':
          preset_min.value = 5512
          preset_max.value = 11024
          tooltip.value = 'Two Layers Broken'
          break
        case 'Preset14':
          preset_min.value = 5512
          preset_max.value = 11024
          tooltip.value = 'Broken Thick Low Layer with Few High Layer'
          break
        case 'Preset15':
          preset_min.value = 2756
          preset_max.value = 16535
          tooltip.value = 'Broken Layers Broken Large Clouds'
          break
        case 'Preset16':
          preset_min.value = 4134
          preset_max.value = 13780
          tooltip.value = 'Two Layers Broken Large Clouds'
          break
        case 'Preset17':
          preset_min.value = 0
          preset_max.value = 8268
          tooltip.value = 'Two Layers Broken/Overcast'
          break
        case 'Preset18':
          preset_min.value = 0
          preset_max.value = 12402
          tooltip.value = 'Three Layers Broken/Overcast'
          break
        case 'Preset19':
          preset_min.value = 0
          preset_max.value = 12402
          tooltip.value = 'Three Layers Overcast at Low Level'
          break
        case 'Preset20':
          preset_min.value = 0
          preset_max.value = 12402
          tooltip.value = 'Three Layers Overcast at Low Level'
          break
        case 'Preset21':
          preset_min.value = 4134
          preset_max.value = 13780
          tooltip.value = 'Overcast at Low Level'
          break
        case 'Preset22':
          preset_min.value = 1378
          preset_max.value = 13780
          tooltip.value = 'Overcast at Low Level'
          break
        case 'Preset23':
          preset_min.value = 2756
          preset_max.value = 11024
          tooltip.value = 'Three Layers Broken Low Level Scattered High Level'
          break
        case 'Preset24':
          preset_min.value = 1378
          preset_max.value = 8268
          tooltip.value = 'Three Layers Overcast'
          break
        case 'Preset25':
          preset_min.value = 1378
          preset_max.value = 11024
          tooltip.value = 'Three Layers Overcast'
          break
        case 'Preset26':
          preset_min.value = 1378
          preset_max.value = 9646
          tooltip.value = 'Three Layers Overcast'
          break
        case 'Preset27':
          preset_min.value = 1378
          preset_max.value = 8268
          tooltip.value = 'Three Layers Overcast'
          break
        case 'RainyPreset1':
          preset_min.value = 1378
          preset_max.value = 9646
          tooltip.value = 'Overcast with Rain'
          break
        case 'RainyPreset2':
          preset_min.value = 2756
          preset_max.value = 8268
          tooltip.value = 'Overcast with Rain'
          break
        case 'RainyPreset2':
          preset_min.value = 2756
          preset_max.value = 8268
          tooltip.value = 'Overcast with Rain'
          break
      }
    }

    watch(
      () => Weather.value.wx.enable_dust,
      (newValue) => {
        isDustSmokeEnabled.value = newValue
      }
    )

    watch(
      () => Weather.value.wx.halo.preset,
      (newValue) => {
        halo_preset.value = newValue
      }
    )

    watch(
      () => Weather.value.wx.halo.crystalsPreset,
      (newValue) => {
        halo_crystal_preset.value =
          newValue === undefined ? 'Tangents' : newValue
      }
    )

    watch(
      () => Weather.value.wx.clouds.preset,
      (newValue) => {
        cloud_preset.value = newValue === undefined ? 'Nothing' : newValue
        updateCloudBaseMinMax(newValue === undefined ? 'Nothing' : newValue)
      }
    )

    watch(
      () => Weather.value.wx.clouds.density,
      (newValue) => {
        cloud_density.value = newValue === undefined ? 0 : newValue
      }
    )

    watch(
      () => Weather.value.wx.clouds.iprecptns,
      (newValue) => {
        precip.value = newValue
      }
    )

    watch(
      () => Weather.value.wx.season.temperature,
      (newValue) => {
        temp.value = newValue
      }
    )

    watch(
      () => Weather.value.wx.enable_fog,
      (newValue) => {
        isFogEnabled.value = newValue
      }
    )

    watch(
      () => Weather.value.wx.qnh,
      (newValue) => {
        pressure.value = mmHgToinHG(newValue)
      }
    )

    return {
      updatePressure,
      updateTemp,
      updateHaloPreset,
      updateHaloCrystalPreset,
      updateCloudPreset,
      updateCloudDensity,
      updatePrecip,
      updateToggleDust,
      updateToggleFog,
      updateFogVis: Weather.value.updateFogVis,
      updateFogThickness: Weather.value.updateFogThickness,
      updateCloudBase: Weather.value.updateCloudBase,
      updateCloudThickness: Weather.value.updateCloudThickness,
      updateDustVis: Weather.value.updateDustVis,
      cloud_preset,
      tooltip,
      cloud_base,
      isFogEnabled,
      isDustSmokeEnabled,
      fog_thickness,
      fog_visibility,
      dust_smoke_visibility,
      cloud_thickness,
      temp,
      pressure,
      halo_preset,
      cloud_density,
      precip,
      halo_crystal_preset,
      preset_min,
      preset_max,
      halo_options: [
        { label: 'Off', value: 'off' },
        { label: 'Auto', value: 'auto' },
        { label: 'Ice Halo On All Mediums', value: 'AtmoHighClouds' },
        {
          label: 'Ice Halo On High Volumentric Clouds',
          value: 'VolumetricOnly'
        },
        {
          label: 'Ice Halo On Cirrus and High Volumentric Clouds',
          value: 'HighClouds'
        },
        { label: 'Ice Halo On Cirrus Clouds', value: 'CirrusOnly' }
      ],
      crystal_options: [
        { label: 'AllKinds', value: 'AllKinds' },
        { label: 'BasicHaloCircle', value: 'BasicHaloCircle' },
        { label: 'BasicHaloWithSundogs', value: 'BasicHaloWithSundogs' },
        { label: 'BasicSundogsTangents', value: 'BasicSundogsTangents' },
        { label: 'SundogsArcs', value: 'SundogsArcs' },
        { label: 'Tangents', value: 'Tangents' }
      ],
      cloud_options: [
        { label: 'Nothing', value: 'Nothing' }, // Not an actual preset
        { label: 'Light Scattered 1', value: 'Preset1' },
        { label: 'Light Scattered 2', value: 'Preset2' },
        { label: 'High Scattered 1', value: 'Preset3' },
        { label: 'High Scattered 2', value: 'Preset4' },
        { label: 'Scattered 1', value: 'Preset5' },
        { label: 'Scattered 2', value: 'Preset6' },
        { label: 'Scattered 3', value: 'Preset7' },
        { label: 'Scattered 4', value: 'Preset8' },
        { label: 'Scattered 5', value: 'Preset9' },
        { label: 'Scattered 6', value: 'Preset10' },
        { label: 'Scattered 7', value: 'Preset11' },
        { label: 'Broken 1', value: 'Preset12' },
        { label: 'Broken 2', value: 'Preset13' },
        { label: 'Broken 3', value: 'Preset14' },
        { label: 'Broken 4', value: 'Preset15' },
        { label: 'Broken 5', value: 'Preset16' },
        { label: 'Broken 6', value: 'Preset17' },
        { label: 'Broken 7', value: 'Preset18' },
        { label: 'Broken 8', value: 'Preset19' },
        { label: 'Overcast 1', value: 'Preset20' },
        { label: 'Overcast 2', value: 'Preset21' },
        { label: 'Overcast 3', value: 'Preset22' },
        { label: 'Overcast 4', value: 'Preset23' },
        { label: 'Overcast 5', value: 'Preset24' },
        { label: 'Overcast 6', value: 'Preset25' },
        { label: 'Overcast 7', value: 'Preset26' },
        { label: 'Overcast 8', value: 'Preset27' },
        { label: 'Overcast & Rain 1', value: 'RainyPreset1' },
        { label: 'Overcast & Rain 2', value: 'RainyPreset2' },
        { label: 'Overcast & Rain 3', value: 'RainyPreset3' }
      ],
      precip_options: [
        { label: 'None', value: 0 },
        { label: 'Rain', value: 1 }
      ]
    }
  },
  components: {
    SliderComponent,
    NSpace,
    NFormItem,
    NInputNumber,
    NSelect,
    NTooltip,
    NCheckbox,
    NDivider
  }
}
</script>
