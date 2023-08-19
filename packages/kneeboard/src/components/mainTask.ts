import { translate } from '@dcs-web-editor-mono/utils'

import { Component, Context } from "..";
import './mainTask.css';

const component: Component = {
  id: 'main-task',
  template: `<p id="main-task"><b>BRIEFING </b></p>`,
  render: (c: Context) => `<textarea>${translate(c.mission.descriptionText, c.dictionary)}</textarea>`,
}

export default component;