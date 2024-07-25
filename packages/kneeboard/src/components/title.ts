import { translate } from "@dcs-web-editor-mono/utils";

import { Component, Context } from "../types";
import "./title.css";

const component: Component = {
  id: "title",

  render: (c: Context) => {
    const txt = translate(c.mission.sortie, c.dictionary) || "BRIEFING";
    return `<span class="title"><div contenteditable>${txt}</span></div>`;
  },

  hasContent: (c: Context) => translate(c.mission.sortie, c.dictionary),
};

export default component;
