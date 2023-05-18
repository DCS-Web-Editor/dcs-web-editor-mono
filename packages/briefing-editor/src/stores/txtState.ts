import { defineStore } from "pinia";
import { IBriefing } from "../types";

const textBriefing: IBriefing = {
  maxDictId: 6,
  DictKey_descriptionText_1: "",
  DictKey_descriptionRedTask_2: "",
  DictKey_descriptionBlueTask_3: "",
  DictKey_descriptionNeutralsTask_4: "",
  DictKey_sortie_5: "",
};

export const useTxtState = defineStore("txt", {
  state: () => ({
    txt: textBriefing,
  }),
  actions: {
    setSortie(v: string) {
      this.txt.DictKey_sortie_5 = v;
    },
    setMaxDictId(v: number) {
      this.txt.maxDictId = v;
    },
    setBlueTask(v: string) {
      this.txt.DictKey_descriptionBlueTask_3 = v;
    },
    setNeutralTask(v: string) {
      this.txt.DictKey_descriptionNeutralsTask_4 = v;
    },
    setRedTask(v: string) {
      this.txt.DictKey_descriptionRedTask_2 = v;
    },
    setSituation(v: string) {
      this.txt.DictKey_descriptionText_1 = v;
    },
    getAll() {
      return this.txt;
    },
  },
});
