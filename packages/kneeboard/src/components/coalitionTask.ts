import { translate } from "@dcs-web-editor-mono/utils";
import { startCase, upperCase } from "lodash";

import { Component, Context } from "../types";
import "./coalitionTask.css";

const component: Component = {
  id: "coalition-task",
  render: (c: Context) => {
    const taskName = `description${startCase(c.coalitionName)}Task`;
    return `<h4 class="center">${upperCase(
      c.coalitionName
    )} TASK</h4><div contenteditable>${translate(c.mission[taskName], c.dictionary)}</div>`;
  },
};

export default component;
