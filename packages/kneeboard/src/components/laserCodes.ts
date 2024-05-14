import { Component, Context } from "..";
import "./laserCodes.css";

const component: Component = {
  id: "laser-codes",

  render: (c: Context) => {
    return `<h4 class="center">LASERCODES</h4>
    <div contenteditable>Click to add your laser codes...</div>`;
  },
};

export default component;
