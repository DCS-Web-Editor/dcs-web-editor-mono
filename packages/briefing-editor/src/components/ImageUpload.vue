<template>
  <n-tabs type="segment">
    <n-tab-pane name="blue" tab="Blue">
      <n-upload
        accept=".png, .jpeg, .jpg"
        :default-file-list="previewFileListBlue"
        list-type="image-card"
        :custom-request="customRequestBlue"
        :on-remove="onRemove"
      />
    </n-tab-pane>
    <n-tab-pane name="neutral" tab="Neutral">
      <n-upload
        accept=".png, .jpeg, .jpg"
        :default-file-list="previewFileListNeutral"
        list-type="image-card"
        :custom-request="customRequestNeutral"
        :on-remove="onRemove"
      />
    </n-tab-pane>
    <n-tab-pane name="red" tab="Red">
      <n-upload
        accept=".png, .jpeg, .jpg"
        :default-file-list="previewFileListRed"
        list-type="image-card"
        :custom-request="customRequestRed"
        :on-remove="onRemove"
      />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { Ref, onBeforeUnmount, onMounted, ref } from "vue";
import { useMapRescStore } from "../stores/mapResourceState";
import { useImgStore } from "../stores/imgState";
import { useTxtState } from "../stores/txtState";
import {
  type UploadFileInfo,
  NUpload,
  NTabs,
  NTabPane,
  UploadCustomRequestOptions,
} from "naive-ui";
import { IBriefingImages } from "../types";

const map = useMapRescStore();
const img = useImgStore();
const txt = useTxtState();

let id_num = 6; // image id's start at 6, 1-5 are for descriptions

const changeId = () => {
  return `ResKey_ImageBriefing_${id_num++}`;
};

const placeholder: UploadFileInfo = {
  id: "none",
  name: "none",
  status: "finished",
  url: "none",
};

enum Coalitions {
  red = "red",
  neutral = "neutral",
  blue = "blue",
}

const setData = (key: string, name: string, coa: Coalitions) => {
  map.setOne(key, name);
  switch (coa) {
    case Coalitions.blue:
      img.addBlue(key);
      break;
    case Coalitions.neutral:
      img.addNetural(key);
      break;
    case Coalitions.red:
      img.addRed(key);
      break;
  }
};

const findKeys = (keys: string[], coa: Coalitions): UploadFileInfo[] => {
  return keys
    .filter((key) => key.includes("ResKey_ImageBriefing_"))
    .map((key) => {
      const item = localStorage.getItem(key);
      if (item !== null) {
        const data: UploadFileInfo = JSON.parse(item);
        setData(key, data.name, coa);
        return {
          id: key,
          name: data.name as string,
          status: "finished",
          url: data.url as string,
        };
      } else {
        return placeholder;
      }
    });
};

const customRequest = (
  { file, onFinish }: UploadCustomRequestOptions,
  previewFile: Ref<UploadFileInfo[]>,
  coa: Coalitions
) => {
  const reader = new FileReader();
  reader.onloadend = function () {
    const dataUrl = reader.result;
    const id = changeId();
    txt.txt.maxDictId = id_num;
    file.id = id;
    const file_data = {
      name: file.name,
      url: dataUrl as string,
    };
    setData(file.id, file.name, coa);
    localStorage.setItem(file.id, JSON.stringify(file_data));
    window.dispatchEvent(new Event("localStorageChange"));
    previewFile.value = [
      {
        id: file.id,
        name: file.name,
        status: "finished",
        url: dataUrl as string,
      },
      ...previewFile.value,
    ];
    onFinish();
  };
  reader.readAsDataURL(file.file as Blob);
};

const removeIdFromBriefingImages = (
  briefingImages: IBriefingImages,
  id: string
): IBriefingImages => {
  for (let key in briefingImages) {
    briefingImages[key as keyof IBriefingImages] = briefingImages[
      key as keyof IBriefingImages
    ].filter((value) => value !== id);
  }
  return briefingImages;
};

const onRemove = (data: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}) => {
  localStorage.removeItem(data.file.id);
  delete map.map[data.file.id];
  img.briefing = removeIdFromBriefingImages(img.briefing, data.file.id);

  // refactor to watch state instead of manually filtering it
  previewFileListRed.value = previewFileListRed.value.filter(
    (file) => file.id !== data.file.id
  );

  previewFileListBlue.value = previewFileListBlue.value.filter(
    (file) => file.id !== data.file.id
  );

  previewFileListNeutral.value = previewFileListNeutral.value.filter(
    (file) => file.id !== data.file.id
  );
  return true;
};

const customRequestRed = (options: UploadCustomRequestOptions) => {
  customRequest(options, previewFileListRed, Coalitions.red);
};

const customRequestBlue = (options: UploadCustomRequestOptions) => {
  customRequest(options, previewFileListBlue, Coalitions.blue);
};

const customRequestNeutral = (options: UploadCustomRequestOptions) => {
  customRequest(options, previewFileListNeutral, Coalitions.neutral);
};

const previewFileListRed = ref<UploadFileInfo[]>(
  findKeys(img.briefing.pictureFileNameR, Coalitions.red)
);
const previewFileListBlue = ref<UploadFileInfo[]>(
  findKeys(img.briefing.pictureFileNameB, Coalitions.blue)
);
const previewFileListNeutral = ref<UploadFileInfo[]>(
  findKeys(img.briefing.pictureFileNameN, Coalitions.neutral)
);

onMounted(() => {
  window.addEventListener("localStorageChange", () => {
    const data = Object.keys(localStorage)
      .filter((key) => key.includes("ResKey_ImageBriefing_"))
      .map((key) => {
        const item = localStorage.getItem(key) ?? JSON.stringify(placeholder);
        const data = JSON.parse(item);
        return {
          id: key,
          name: data.name,
          status: "finished",
          url: data.url,
        };
      });
    map.setAll(data);
  });
});

onBeforeUnmount(() => {
  Object.keys(localStorage)
    .filter((key) => key.includes("ResKey_ImageBriefing_"))
    .forEach((key) => localStorage.removeItem(key));
});
</script>
