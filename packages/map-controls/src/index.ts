export let map: any;

export const context = {
  iconBar: null,
  writeMode: false,
  writeInitialized: false,
  paintInitialized: false,
  paintMode: false,
  searchMode: false,
  iconMode: false,
  getColor: () => "#0C8",
};

export * from "./paintControl";
export * from "./textControl";
export * from "./searchControl";
export * from "./screenshotControl";
export * from "./iconControl";
