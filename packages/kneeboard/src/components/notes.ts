import { Component, Context } from "..";
import './notes.css';

const component: Component = {
  id: 'notes',

  render: (c: Context) => {
    return `<h4 class="center">NOTES</h4>
    <div contenteditable>Click to edit your notes...<br><br></div>`
  },
}

export default component;