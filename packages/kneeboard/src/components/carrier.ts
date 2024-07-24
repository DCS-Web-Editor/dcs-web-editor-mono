import { toDeg, toRad, translate } from "@dcs-web-editor-mono/utils";
import { Component, Context } from "../types";
import "./carrier.css";
const component: Component = {
  id: "carrier",

  render: (c: Context) => {
    const { country, dictionary } = c;
    const title = `<h4 class="center">CARRIER</h4>`;
    const carriers = `<div contenteditable><ul>${
      country.ship?.group
        .map((group) => {
          if (group.route) {
            const unit = group.units[0];
            const frequency = `<span class="freq">${unit.frequency}</span>`;

            // TACAN
            const tacanTasks = group.route?.points
              ?.flatMap(
                (p) =>
                  p?.task.params?.tasks?.filter &&
                  p.task.params?.tasks?.filter((t) => t.id === "WrappedAction")
              )
              .filter((t) => t?.params?.action?.id === "ActivateBeacon")
              .map((t) => t?.params?.action?.params);
            const tacanTask = tacanTasks[0];
            const tacan = tacanTask
              ? `<span class="tacan">TACAN ${tacanTask.callsign} ${tacanTask.channel}${tacanTask.modeChannel}</span>`
              : "";

            // ICLS
            const iclsTasks = group.route?.points
              ?.flatMap(
                (p) =>
                  p?.task.params?.tasks?.filter &&
                  p.task.params?.tasks?.filter((t) => t.id === "WrappedAction")
              )
              .filter((t) => t?.params?.action?.id === "ActivateICLS")
              .map((t) => t?.params?.action?.params);
            const iclsTask = iclsTasks[0];
            const icls = iclsTask ? `<span class="ils">ICLS CHAN ${iclsTask.channel} </span>` : "";

            return `<li><b>${translate(group.name, dictionary)}</b> <span class="type">${
              unit.type
            }</span> BRC <span class="course">${toDeg(
              unit.heading - toRad(10)
            )}°</span>  ${frequency.toLocaleString()}, ${tacan} ${icls}</li>`;
          } else return false;
        })
        .filter((i) => i)
        .join("") || "No carrier available"
    }</ul></div>`;

    return title + carriers;
  },
};

export default component;
