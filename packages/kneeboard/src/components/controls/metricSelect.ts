import { Component, Context, refresh } from "../..";
import { save } from "../../cache";
import calculator from "../../calculator";

const options = [
  {
    label: 'Metric',
    value: 'METRIC',
  },
  {
    label: 'Imperial',
    value: 'IMPERIAL',
  },
]

const component: Component = {
  id: 'metric-select',
  template: '<div id="metric-select"></div>',
  control: `<select name="metricSelect" id="metric-select-control" title="Warning: changing units will reset user input">
  ${
    options.map(o => {
      return `<option value="${o.value}" ${calculator.config.system === o.value ? 'selected' : ''}>${o.label}</option>`
    })
  }
</select>`,
  render: (c: Context) => {
    const select = document.getElementById('metric-select-control')!;

    select.addEventListener('change', selectionHandler)
    return '';
  },
}

export default component;


function selectionHandler(e:Event) {
  const value = e.target.value
  
  save('system', value)
  calculator.config.system = value;

  setTimeout(refresh, 100);
}