import { defineStore } from "pinia";
import { IBriefingImages } from "../types";

const defaultBriefing: IBriefingImages = {
  pictureFileNameB: [],
  pictureFileNameN: [],
  pictureFileNameR: [],
};

export const useImgStore = defineStore("bf", {
  state: () => ({
    briefing: defaultBriefing,
  }),
  actions: {
    setBluePictures(keys: string[]) {
      this.briefing.pictureFileNameB = keys;
    },
    setNeutralPictures(keys: string[]) {
      this.briefing.pictureFileNameN = keys;
    },
    setRedPictures(keys: string[]) {
      this.briefing.pictureFileNameR = keys;
    },
    addBlue(key: string) {
      this.briefing.pictureFileNameB.push(key);
    },
    addNetural(key: string) {
      this.briefing.pictureFileNameN.push(key);
    },
    addRed(key: string) {
      this.briefing.pictureFileNameR.push(key);
    },
  },
});
