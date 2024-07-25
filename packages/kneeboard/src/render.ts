import { load, save } from "./cache";
import { refresh } from ".";
import { Component, Context } from "./types";
import { initDrag, setupDraggables } from "./drag";

export function renderRegisteredComponents(
  registeredComponents: Component[],
  c: Context,
  noControls = false,
  only: null | string = null
) {
  registeredComponents.forEach((component, i) => {
    // render only specific component?
    if (only && component.id !== only) return;

    if (component.hasContent && !component.hasContent(c)) {
      const section = document.getElementById(component.id)!;
      section.classList.add("hidden", "no-print");
    }

    if (component.template !== false || noControls === false) {
      updateComponentContent(component.id, component.render(c));
    }

    // add toggle event listeners
    if (component.template !== false) {
      renderToggles(component, i);
    }
  });

  initDrag();
  setupDraggables();
}

function renderToggles(component: Component, i: number) {
  const toggle = document.querySelector(`input[name="${component.id}"]`)!;
  toggle.addEventListener("change", toggleClickHandler);

  const hidden = load("hidden-" + component.id);

  const section = document.getElementById(component.id);
  if (!section) return;
  if (hidden) {
    section.classList.add("hidden", "no-print");
    cleanupCharts(component.id);
  }

  const h4 = section.getElementsByTagName("h4")?.[0];
  if (h4) {
    h4.draggable = true;
    h4.classList.add("draggable");
  }
}

function toggleClickHandler(e: Event) {
  const { name, checked } = e.target;
  const id = name;
  const section = document.getElementById(id)!;

  if (checked) section.classList.remove("hidden", "no-print");
  else {
    section.classList.add("hidden", "no-print");
    cleanupCharts(id);
  }

  save("hidden-" + id, !checked);
  refresh(id);
}

async function updateComponentContent(id: string, value: string | Promise<any>) {
  if ((value as Promise<any>)?.then) value = await value;
  const c = document.getElementById(id);
  if (c) c.innerHTML = value as string;
}

function cleanupCharts(id: string) {
  if (id === "wp-profile") {
    window.waypointChart?.destroy();
    delete window.waypointChart;
    setTimeout(() => document.getElementById("waypoint-chart")?.remove(), 10);
  }

  if (id === "d-profile") {
    window.distanceChart?.destroy();
    delete window.distanceChart;
    setTimeout(() => document.getElementById("waypoint-distance-chart")?.remove(), 10);
  }
}
