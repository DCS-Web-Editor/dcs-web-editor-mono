import { load, save } from "./cache";
import { refresh } from ".";
import { Component, Context } from "./types";
import { initDrag } from "./drag";

export function renderRegisteredComponents(
  registeredComponents: Component[],
  c: Context,
  noControls = false,
  only: null | string = null
) {
  registeredComponents.forEach((component, i) => {
    // render only specific component?
    if (only && component.id !== only) return;

    if (component.template !== false || noControls === false) {
      updateComponentContent(component.id, component.render(c));
    }

    // add toggle event listeners
    if (component.template !== false) {
      renderToggles(component, i);
    }
  });

  initDrag();
}

function renderToggles(component: Component, i: number) {
  const toggle = document.querySelector(`input[name="${component.id}"]`)!;
  toggle.addEventListener("change", toggleClickHandler);

  const hidden = load("hidden-" + component.id);

  const el = document.getElementById(component.id);
  if (!el) return;
  if (hidden) el.classList.add("hidden");

  const h4 = el.getElementsByTagName("h4")?.[0];
  if (h4) {
    h4.draggable = true;
    h4.classList.add("draggable");
  }
}

function toggleClickHandler(e: Event) {
  const { name, checked } = e.target;
  const section = document.getElementById(name)!;

  if (checked) section.classList.remove("hidden");
  else section.classList.add("hidden");

  save("hidden-" + name, !checked);
  refresh(name);
}

async function updateComponentContent(id: string, value: string | Promise<any>) {
  if ((value as Promise<any>)?.then) value = await value;
  const c = document.getElementById(id);
  if (c) c.innerHTML = value as string;
}
