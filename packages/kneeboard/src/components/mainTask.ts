import { translate } from '@dcs-web-editor-mono/utils'

import { Component, Context } from "..";
import './mainTask.css';

const component: Component = {
  id: 'main-task',
  render: (c: Context) => {
    return `<h4 class="center">BRIEFING </h4><div contenteditable>${translate(c.mission.descriptionText, c.dictionary)}</div>`
  },
}

export default component;
