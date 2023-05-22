import { IMapResourceInit, IMapResourceFinal } from "../types";
import { defineStore } from "pinia";

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
