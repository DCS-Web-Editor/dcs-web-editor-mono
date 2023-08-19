import { Component, Context } from "../..";

const component: Component = {
  id: 'coordinate-select',
  template: '',
  control: `  <select name="coordinateSelect" id="coordinate-select">
  <option value="dd">DD</option>
  <option value="ddm" disabled="true">DMM (soon)</option>
  <option value="mgrs" disabled="true">MGRS (soon)</option>
</select>`,
  render: (c: Context) => {
    return '';
  },
}

export default component;
