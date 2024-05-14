import { Component, Context } from "../types";
import "./laserCodes.css";

const component: Component = {
  id: "laser-codes",

  render: (c: Context) => {
    const { unit } = c;
    const title = `<h4 class="center">LASERCODES</h4>`;
    if (!unit.payload) return title;

    const props = unit.AddPropAircraft;
    const empty = "Click to add your laser codes...";

    if (!props) return title + empty;

    const {
      GBULaserCode1,
      GBULaserCode10,
      GBULaserCode100,
      LaserCode1,
      LaserCode10,
      LaserCode100,
    } = props;

    const gbuLaserCode = GBULaserCode1 + 10 * GBULaserCode10 + 100 * GBULaserCode100;
    const laserCode = LaserCode1 + 10 * LaserCode10 + 100 * LaserCode100;

    const msg = gbuLaserCode || laserCode ? "" : empty;

    const laserCodeRender = laserCode ? "1" + laserCode : "";
    const gbuLaserCodeRender = gbuLaserCode ? "GBU: 1" + gbuLaserCode : "";

    return title + `<div contenteditable>${msg} ${laserCodeRender} ${gbuLaserCodeRender}</div>`;
  },
};

export default component;
