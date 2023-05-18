import { IMapResourceInit, IMapResourceFinal } from "../types";
import { defineStore } from "pinia";
import { UploadFileInfo } from "naive-ui";

const img_data: { [key: string]: UploadFileInfo } = {};

const defaultMapResource: IMapResourceFinal = {};

export const useMapRescStore = defineStore("map", {
  state: () => ({
    map: defaultMapResource,
  }),
  actions: {
    setAll(v: IMapResourceInit[]) {
      this.map = v.reduce<{ [key: string]: string }>((accumulator, current) => {
        accumulator[current.id] = current.name;
        return accumulator;
      }, {});
    },
    getAll(): IMapResourceFinal {
      return this.map;
    },
    setOne(key: string, value: string) {
      this.map[key] = value;
    },
  },
});

export const useImgDataStore = defineStore("img", {
  state: () => ({
    img: img_data,
  }),
  actions: {
    setImgData(v: UploadFileInfo[]) {
      v.forEach((item) => {
        img_data[item.name] = item;
      });
    },
    setOneImage(key: string, value: UploadFileInfo) {
      img_data[key] = value;
    },
    getOneImage(key: string): UploadFileInfo {
      return img_data[key];
    },
    getAllImage(): { [key: string]: UploadFileInfo } {
      return img_data;
    },
    deleteOneImage(key: string) {
      delete img_data[key];
    },
  },
});
