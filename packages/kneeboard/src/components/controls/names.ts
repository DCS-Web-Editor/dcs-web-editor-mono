import { Component, Context } from "../../types";
import { load, save } from "../../cache";
import { refresh } from "../..";
import "./names.css";

let _checked = load("use-group-names");

const component: Component = {
  id: "names",

  control: `
  <div id="names">
  
    <label class="no-print" for="prefer-name1" data-html2canvas-ignore>
        <input type="radio" id="prefer-name1" class="no-print" name="use-group-names" onclick="toggleCallsigns()" ${
          _checked ? "checked" : ""
        } data-html2canvas-ignore>
    Names
    </label>

    <label class="no-print" for="prefer-name2" data-html2canvas-ignore>
        <input type="radio" id="prefer-name2" class="no-print" name="use-group-names" onclick="toggleCallsigns()" ${
          _checked ? "" : "checked"
        } data-html2canvas-ignore>
    Callsigns
    </label>
  
  </div>
  `,
  render: (c: Context) => {
    return "";
  },
};

export default component;

window.toggleCallsigns = function toggleCallsigns() {
  _checked = !_checked;

  save("use-group-names", _checked);

  // refresh
  setTimeout(() => {
    refresh("friendlies");
    refresh("package");
    refresh("unit");
    refresh("group");
    refresh("awacs");
    refresh("tanker");
  }, 10);
};
