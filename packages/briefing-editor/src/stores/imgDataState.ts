import { UploadFileInfo } from "naive-ui";
import { defineStore } from "pinia";

export const useImgDataStore = defineStore("img", {
  state: () => ({
    img: {} as { [key: string]: UploadFileInfo },
  }),
  actions: {
    setImgData(v: UploadFileInfo[]) {
      v.forEach((item) => {
        this.img[item.name] = item;
      });
    },
    setOneImage(key: string, value: UploadFileInfo) {
      this.img[key] = value;
    },
    getOneImage(key: string): UploadFileInfo {
      return this.img[key];
    },
    getAllImage(): { [key: string]: UploadFileInfo } {
      return this.img;
    },
    deleteOneImage(key: string) {
      delete this.img[key];
    },
  },
});
