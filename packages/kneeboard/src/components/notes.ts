import { Component, Context } from "..";
import './notes.css';

const component: Component = {
  id: 'notes',

  template: `<div id="notes">
  <h4 class="center">N O T E S</h4>
  <div contenteditable>Click to edit your notes...</div>
  <div class="spacer"></div>
</div>`,

  render: (c: Context) => {
    return ``
  },
}

export default component;