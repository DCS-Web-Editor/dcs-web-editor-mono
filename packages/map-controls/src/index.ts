export let map: any;

export const context = {
  iconBar: null,
  writeMode: false,
  writeInitialized: false,
  paintInitialized: false,
  paintMode: false,
  searchMode: false,
  iconMode: false,
  follow: true,
  getColor: () => "#0C8",
};

export * from "./paintControl";
export * from "./paintNodragControl";
export * from "./textControl";
export * from "./searchControl";
export * from "./screenshotControl";
export * from "./iconControl";
export * from "./followControl";
