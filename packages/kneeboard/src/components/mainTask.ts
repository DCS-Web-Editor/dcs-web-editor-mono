import { translate } from "@dcs-web-editor-mono/utils";

import { Component, Context } from "../types";
import "./mainTask.css";

const component: Component = {
  id: "main-task",
  render: (c: Context) => {
    const text =
      translate(c.mission.descriptionText, c.dictionary) ||
      "No text found. Click to enter briefing text...<br>";

    return `<h4 class="center">BRIEFING</h4><div contenteditable>${text}</div>`;
  },
};

export default component;
