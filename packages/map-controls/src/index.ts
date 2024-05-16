export let map: any;

export const context = {
  writeMode: false,
  writeInitialized: false,
  paintInitialized: false,
  paintMode: false,
  getColor: () => "#0C8",
};

export * from "./paintControl";
export * from "./textControl";
export * from "./screenshotControl";
