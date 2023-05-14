<template>
  <div class="flex flex-row">
    <n-space vertical class="mr-6 w-full">
      <n-form-item label="Temperature" label-style="color: white">
        <n-input-number
          id="temperature-input"
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
        />
      </n-form-item>
      <div v-if="halo_preset !== 'off' && halo_preset !== 'auto'">
        <n-form-item label="Halo Preset" label-style="color: white">
          <n-select
            class="w-full"
            v-model:value="halo_crystal_preset"
            :options="crystal_options"
          />
        </n-form-item>
      </div>
      <n-divider class="divider" />
      <n-checkbox v-model:checked="isFogEnabled">Toggle Fog</n-checkbox>
      <SliderComponent
        labelText="Fog Visibility"
        @update="updateFogVisibility"
        :val="fog_visibility"
        class="mt-2 w-full"
        suffix="ft"
        :max="19685"
        :disabled="!isFogEnabled"
      />
      <SliderComponent
        labelText="Fog Thickness"
        @update="updateFogThickness"
        :val="fog_thickness"
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
              :options="cloud_options"
            />
          </template>
          {{ tooltip }}
        </n-tooltip>
      </n-form-item>
      <n-divider class="divider" />
      <SliderComponent
        labelText="Cloud Base"
        @update="updateCloudBase"
        :val="cloud_base"
        :min="preset_min"
        :max="preset_max"
        suffix="ft"
      />
      <div v-if="cloud_preset === 'Nothing'">
        <SliderComponent
          labelText="Cloud Thickness"
          @update="updateCloudThickness"
          :val="cloud_thickness"
          class="w-full"
          suffix="ft"
          :max="3281"
        />
        <n-form-item label="Density" label-style="color: white">
          <n-input-number
            id="cloud-thickness-input"
            class="w-full min-w-24"
            v-model:value="cloud_density"
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
              :options="precip_options"
            />
          </n-form-item>
        </div>
        <n-divider class="divider" />
      </div>
      <n-checkbox v-model:checked="isDustSmokeEnabled">
        Toggle Dust/Smoke
      </n-checkbox>
      <SliderComponent
        labelText="Dust Smoke Visibility"
        @update="updateDustSmokeVisibility"
        :val="dust_smoke_visibility"
        suffix="ft"
        class="mt-2"
        :min="984"
        :max="9843"
        :disabled="!isDustSmokeEnabled"
      />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import SliderComponent from "./SliderComponent.vue";
import {
  NFormItem,
  NInputNumber,
  NSelect,
  NCheckbox,
  NDivider,
  NSpace,
  NTooltip,
} from "naive-ui";
import { mmHgToinHG, inHgTommHG, MToft, ftToM } from "../libs/convert";
import { useWeatherStore } from "../stores/state";
import { computed } from "vue";

const Weather = computed(() => useWeatherStore());

const cloud_preset = computed({
  get: () => Weather.value.wx.clouds.preset || "Nothing",
  set: (value) => {
    Weather.value.wx.clouds.preset = value === "Nothing" ? undefined : value;
  },
});

const cloud_base = computed({
  get: () => MToft(Weather.value.wx.clouds.base),
  set: (value) => {
    Weather.value.wx.clouds.base = ftToM(value);
  },
});

const updateCloudBase = (value: number) => {
  Weather.value.wx.clouds.base = ftToM(value);
};

const cloud_thickness = computed({
  get: () => MToft(Weather.value.wx.clouds.thickness || 0),
  set: (value) => {
    Weather.value.wx.clouds.thickness = ftToM(value);
  },
});

const updateCloudThickness = (value: number) => {
  Weather.value.wx.clouds.thickness = ftToM(value);
};

const cloud_density = computed({
  get: () => Weather.value.wx.clouds.density || 0,
  set: (value) => {
    Weather.value.wx.clouds.density = value;
  },
});

const precip = computed({
  get: () => Weather.value.wx.clouds.iprecptns || 0,
  set: (value) => {
    Weather.value.wx.clouds.iprecptns = value;
  },
});

const isDustSmokeEnabled = computed({
  get: () => Weather.value.wx.enable_dust,
  set: (value) => {
    Weather.value.wx.enable_dust = value;
  },
});

const dust_smoke_visibility = computed({
  get: () => MToft(Weather.value.wx.dust_density),
  set: (value) => {
    Weather.value.wx.dust_density = ftToM(value);
  },
});

const updateDustSmokeVisibility = (value: number) => {
  Weather.value.wx.dust_density = ftToM(value);
};

const isFogEnabled = computed({
  get: () => Weather.value.wx.enable_fog,
  set: (value) => {
    Weather.value.wx.enable_fog = value;
  },
});

const fog_thickness = computed({
  get: () => MToft(Weather.value.wx.fog.thickness),
  set: (value) => {
    Weather.value.wx.fog.thickness = ftToM(value);
  },
});

const updateFogThickness = (value: number) => {
  Weather.value.wx.fog.thickness = ftToM(value);
};

const fog_visibility = computed({
  get: () => MToft(Weather.value.wx.fog.visibility),
  set: (value) => {
    Weather.value.wx.fog.visibility = ftToM(value);
  },
});

const updateFogVisibility = (value: number) => {
  Weather.value.wx.fog.visibility = ftToM(value);
};

const temp = computed({
  get: () => Math.round(Weather.value.wx.season.temperature),
  set: (value) => {
    Weather.value.wx.season.temperature = Math.round(value);
  },
});

const pressure = computed({
  get: () => mmHgToinHG(Weather.value.wx.qnh),
  set: (value) => {
    Weather.value.wx.qnh = inHgTommHG(value);
  },
});

const halo_preset = computed({
  get: () => Weather.value.wx.halo?.preset ?? "off",
  set: (value: string) => {
    if (Weather.value.wx.halo) {
      Weather.value.wx.halo.preset = value;
    } else {
      Weather.value.wx.halo = {
        preset: value !== "off" ? value : "off",
      };
    }

    if (
      value !== "off" &&
      value !== "auto" &&
      Weather.value.wx.halo &&
      !Weather.value.wx.halo.crystalsPreset
    ) {
      Weather.value.wx.halo.crystalsPreset = "AllKinds";
    }
  },
});

const halo_crystal_preset = computed({
  get: () => Weather.value.wx.halo?.crystalsPreset ?? "AllKinds",
  set: (value: string) => {
    if (Weather.value.wx.halo) {
      Weather.value.wx.halo.crystalsPreset = value;
    }
  },
});

enum CloudPresets {
  Nothing = "Nothing",
  Preset1 = "Preset1",
  Preset2 = "Preset2",
  Preset3 = "Preset3",
  Preset4 = "Preset4",
  Preset5 = "Preset5",
  Preset6 = "Preset6",
  Preset7 = "Preset7",
  Preset8 = "Preset8",
  Preset9 = "Preset9",
  Preset10 = "Preset10",
  Preset11 = "Preset11",
  Preset12 = "Preset12",
  Preset13 = "Preset13",
  Preset14 = "Preset14",
  Preset15 = "Preset15",
  Preset16 = "Preset16",
  Preset17 = "Preset17",
  Preset18 = "Preset18",
  Preset19 = "Preset19",
  Preset20 = "Preset20",
  Preset21 = "Preset21",
  Preset22 = "Preset22",
  Preset23 = "Preset23",
  Preset24 = "Preset24",
  Preset25 = "Preset25",
  Preset26 = "Preset26",
  Preset27 = "Preset27",
  RainyPreset1 = "RainyPreset1",
  RainyPreset2 = "RainyPreset2",
  RainyPreset3 = "RainyPreset3",
}

interface PresetDetails {
  min: number;
  max: number;
  ttip: string;
}

const tooltip = ref("Nothing");
const preset_min = ref(0);
const preset_max = ref(0);

const PresetValues: Record<CloudPresets, PresetDetails> = {
  [CloudPresets.Nothing]: { min: 984, max: 16404, ttip: "Nothing" },
  [CloudPresets.Preset1]: { min: 2756, max: 13780, ttip: "Few Scattered" },
  [CloudPresets.Preset2]: {
    min: 4134,
    max: 8268,
    ttip: "Two Layers Few Scattered",
  },
  [CloudPresets.Preset3]: {
    min: 2756,
    max: 8268,
    ttip: "Two Layers Scattered",
  },
  [CloudPresets.Preset4]: {
    min: 4134,
    max: 8268,
    ttip: "Two Layers Scattered",
  },
  [CloudPresets.Preset5]: {
    min: 4134,
    max: 15157,
    ttip: "Three Layers High Scattered",
  },
  [CloudPresets.Preset6]: {
    min: 4134,
    max: 13780,
    ttip: "One Layer Scattered/Broken",
  },
  [CloudPresets.Preset7]: {
    min: 5512,
    max: 16535,
    ttip: "Two Layers Scattered/Broken",
  },
  [CloudPresets.Preset8]: {
    min: 12402,
    max: 17913,
    ttip: "Two High Layers Scattered/Broken",
  },
  [CloudPresets.Preset9]: {
    min: 5512,
    max: 12402,
    ttip: "Two Layers Scattered/Broken",
  },
  [CloudPresets.Preset10]: {
    min: 4134,
    max: 13780,
    ttip: "Two Layers Large Thick Clouds",
  },
  [CloudPresets.Preset11]: {
    min: 8268,
    max: 17913,
    ttip: "Two Layers Large Clouds High Ceiling",
  },
  [CloudPresets.Preset12]: {
    min: 5512,
    max: 11024,
    ttip: "Two Layers Scattered Large Clouds High Ceiling",
  },
  [CloudPresets.Preset13]: { min: 5512, max: 11024, ttip: "Two Layers Broken" },
  [CloudPresets.Preset14]: {
    min: 5512,
    max: 11024,
    ttip: "Broken Thick Low Layer with Few High Layer",
  },
  [CloudPresets.Preset15]: {
    min: 2756,
    max: 16535,
    ttip: "Broken Layers Broken Large Clouds",
  },
  [CloudPresets.Preset16]: {
    min: 4134,
    max: 13780,
    ttip: "Two Layers Broken Large Clouds",
  },
  [CloudPresets.Preset17]: {
    min: 0,
    max: 8268,
    ttip: "Two Layers Broken/Overcast",
  },
  [CloudPresets.Preset18]: {
    min: 0,
    max: 12402,
    ttip: "Three Layers Broken/Overcast",
  },
  [CloudPresets.Preset19]: {
    min: 0,
    max: 12402,
    ttip: "Three Layers Overcast at Low Level",
  },
  [CloudPresets.Preset20]: {
    min: 0,
    max: 12402,
    ttip: "Three Layers Overcast at Low Level",
  },
  [CloudPresets.Preset21]: {
    min: 4134,
    max: 13780,
    ttip: "Overcast at Low Level",
  },
  [CloudPresets.Preset22]: {
    min: 1378,
    max: 13780,
    ttip: "Overcast at Low Level",
  },
  [CloudPresets.Preset23]: {
    min: 2756,
    max: 11024,
    ttip: "Three Layers Broken Low Level Scattered High Level",
  },
  [CloudPresets.Preset24]: {
    min: 1378,
    max: 8268,
    ttip: "Three Layers Overcast",
  },
  [CloudPresets.Preset25]: {
    min: 1378,
    max: 11024,
    ttip: "Three Layers Overcast",
  },
  [CloudPresets.Preset26]: {
    min: 1378,
    max: 9646,
    ttip: "Three Layers Overcast",
  },
  [CloudPresets.Preset27]: {
    min: 1378,
    max: 8268,
    ttip: "Three Layers Overcast",
  },
  [CloudPresets.RainyPreset1]: {
    min: 1378,
    max: 9646,
    ttip: "Overcast with Rain",
  },
  [CloudPresets.RainyPreset2]: {
    min: 2756,
    max: 8268,
    ttip: "Overcast with Rain",
  },
  [CloudPresets.RainyPreset3]: {
    min: 2756,
    max: 8268,
    ttip: "Overcast with Rain",
  },
};

function updateCloudBaseMinMax(value: CloudPresets) {
  return PresetValues[value];
}

const { min, max, ttip } = updateCloudBaseMinMax(
  Weather.value.wx.clouds.preset === undefined
    ? CloudPresets.Nothing
    : (Weather.value.wx.clouds.preset as CloudPresets)
);
preset_min.value = min;
preset_max.value = max;
tooltip.value = ttip;

watch(
  () => Weather.value.wx.clouds.preset ?? CloudPresets.Nothing,
  (value) => {
    const { min, max, ttip } = updateCloudBaseMinMax(value as CloudPresets);
    preset_min.value = min;
    preset_max.value = max;
    tooltip.value = ttip;

    if (cloud_base.value < min) {
      cloud_base.value = min;
    } else if (cloud_base.value > max) {
      cloud_base.value = max;
    }
  }
);

const halo_options = [
  { label: "Off", value: "off" },
  { label: "Auto", value: "auto" },
  { label: "Ice Halo On All Mediums", value: "AtmoHighClouds" },
  {
    label: "Ice Halo On High Volumentric Clouds",
    value: "VolumetricOnly",
  },
  {
    label: "Ice Halo On Cirrus and High Volumentric Clouds",
    value: "HighClouds",
  },
  { label: "Ice Halo On Cirrus Clouds", value: "CirrusOnly" },
];
const crystal_options = [
  { label: "AllKinds", value: "AllKinds" },
  { label: "BasicHaloCircle", value: "BasicHaloCircle" },
  { label: "BasicHaloWithSundogs", value: "BasicHaloWithSundogs" },
  { label: "BasicSundogsTangents", value: "BasicSundogsTangents" },
  { label: "SundogsArcs", value: "SundogsArcs" },
  { label: "Tangents", value: "Tangents" },
];
const cloud_options = [
  { label: "Nothing", value: "Nothing" }, // Not an actual preset
  { label: "Light Scattered 1", value: "Preset1" },
  { label: "Light Scattered 2", value: "Preset2" },
  { label: "High Scattered 1", value: "Preset3" },
  { label: "High Scattered 2", value: "Preset4" },
  { label: "Scattered 1", value: "Preset5" },
  { label: "Scattered 2", value: "Preset6" },
  { label: "Scattered 3", value: "Preset7" },
  { label: "Scattered 4", value: "Preset8" },
  { label: "Scattered 5", value: "Preset9" },
  { label: "Scattered 6", value: "Preset10" },
  { label: "Scattered 7", value: "Preset11" },
  { label: "Broken 1", value: "Preset12" },
  { label: "Broken 2", value: "Preset13" },
  { label: "Broken 3", value: "Preset14" },
  { label: "Broken 4", value: "Preset15" },
  { label: "Broken 5", value: "Preset16" },
  { label: "Broken 6", value: "Preset17" },
  { label: "Broken 7", value: "Preset18" },
  { label: "Broken 8", value: "Preset19" },
  { label: "Overcast 1", value: "Preset20" },
  { label: "Overcast 2", value: "Preset21" },
  { label: "Overcast 3", value: "Preset22" },
  { label: "Overcast 4", value: "Preset23" },
  { label: "Overcast 5", value: "Preset24" },
  { label: "Overcast 6", value: "Preset25" },
  { label: "Overcast 7", value: "Preset26" },
  { label: "Overcast 8", value: "Preset27" },
  { label: "Overcast & Rain 1", value: "RainyPreset1" },
  { label: "Overcast & Rain 2", value: "RainyPreset2" },
  { label: "Overcast & Rain 3", value: "RainyPreset3" },
];
const precip_options = [
  { label: "None", value: 0 },
  { label: "Rain", value: 1 },
];
</script>
