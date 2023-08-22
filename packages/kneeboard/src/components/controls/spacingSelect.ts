import { Component, Context, refresh } from "../..";
import { load, save } from "../../cache";

const options = [
  {
    label: 'Condensed',
    value: 'CONDENSED',
  },
  {
    label: 'Normal',
    value: 'NORMAL',
  },
  {
    label: 'Wide',
    value: 'WIDE',
  },
]

const component: Component = {
  id: 'spacing-select',
  template: false,
  control: `<label for="spacingSelect">Spacing</label><select name="spacingSelect" id="spacing-select-control">
  ${
    options.map(o => {
      return `<option value="${o.value}" ${(load('spacing') || 'NORMAL')  === o.value ? 'selected' : ''}>${o.label}</option>`
    })
  }
</select>`,
  render: (c: Context) => {
    const select = document.getElementById('spacing-select-control')!;
    document.querySelector('.kneeboard')!.setAttribute('data-spacing', (load('spacing') || 'NORMAL'));

    select.addEventListener('change', selectionHandler)
    return '';
  },
}

export default component;


function selectionHandler(e:Event) {
  const value = e.target.value;

  document.querySelector('.kneeboard')!.setAttribute('data-spacing', value);
  
  save('spacing', value);

  setTimeout(refresh, 100);
}