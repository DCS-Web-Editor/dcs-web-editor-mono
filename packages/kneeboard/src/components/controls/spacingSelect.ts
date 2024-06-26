import { refresh } from "../..";
import { Component, Context } from "../../types";
import { load, save } from "../../cache";

const DEFAULT_LAYOUT = "FLEX";

const options = [
  {
    label: "Flex (most compact)",
    value: "FLEX",
  },
  {
    label: "Table",
    value: "TABLE",
  },
  {
    label: "Rows",
    value: "CONDENSED",
  },
  {
    label: "Spaced",
    value: "NORMAL",
  },
  {
    label: "Wide (ridiculous)",
    value: "WIDE",
  },
];

const component: Component = {
  id: "spacing-select",
  template: false,
  control: `<label for="spacingSelect">Layout</label><select name="spacingSelect" id="spacing-select-control">
  ${options.map((o) => {
    return `<option value="${o.value}" ${
      (load("spacing") || DEFAULT_LAYOUT) === o.value ? "selected" : ""
    }>${o.label}</option>`;
  })}
</select>`,
  render: (c: Context) => {
    const select = document.getElementById("spacing-select-control")!;
    document
      .querySelector(".kneeboard")!
      .setAttribute("data-spacing", load("spacing") || DEFAULT_LAYOUT);

    select.addEventListener("change", selectionHandler);
    return "";
  },
};

export default component;

function selectionHandler(e: Event) {
  const value = e.target.value;

  document.querySelector(".kneeboard")!.setAttribute("data-spacing", value);

  save("spacing", value);

  setTimeout(refresh, 100);
}
