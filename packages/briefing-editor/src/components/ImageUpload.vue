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
import { computed } from "vue";
import { useMapRescStore } from "../stores/mapResourceState";
import { useImgDataStore } from "../stores/imgDataState";
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
const img_data = useImgDataStore();
const txt = useTxtState();

let id_num = 6; // image id's start at 6, 1-5 are for descriptions

const changeId = () => {
  if (txt.txt.maxDictId > id_num) {
    return `ResKey_ImageBriefing_${txt.txt.maxDictId}`;
  }
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

const findKeys = (keys: string[]): UploadFileInfo[] => {
  return keys.map((key) => {
    const item = img_data.getOneImage(key);
    if (item !== null) {
      const data: UploadFileInfo = item;
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
  coa: Coalitions
) => {
  const reader = new FileReader();
  reader.onloadend = function () {
    const dataUrl = reader.result;
    const id = changeId();
    txt.txt.maxDictId = id_num;
    file.id = id;
    const file_data: UploadFileInfo = {
      id: file.id,
      name: file.name,
      status: "finished",
      url: dataUrl as string,
    };
    setData(file.id, file.name, coa);
    img_data.setOneImage(file.id, file_data);
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
  img_data.deleteOneImage(data.file.id);
  delete map.map[data.file.id];
  img.briefing = removeIdFromBriefingImages(img.briefing, data.file.id);
  return true;
};

const customRequestRed = (options: UploadCustomRequestOptions) => {
  customRequest(options, Coalitions.red);
};

const customRequestBlue = (options: UploadCustomRequestOptions) => {
  customRequest(options, Coalitions.blue);
};

const customRequestNeutral = (options: UploadCustomRequestOptions) => {
  customRequest(options, Coalitions.neutral);
};

const previewFileListRed = computed(() =>
  findKeys(img.briefing.pictureFileNameR)
);

const previewFileListBlue = computed(() =>
  findKeys(img.briefing.pictureFileNameB)
);

const previewFileListNeutral = computed(() =>
  findKeys(img.briefing.pictureFileNameN)
);
</script>
