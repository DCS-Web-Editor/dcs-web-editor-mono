import { translate } from '@dcs-web-editor-mono/utils'

import { Component, Context } from "..";
import './title.css'

const component: Component = {
  id: 'title',
  render: (c: Context) => `<span class="title"><div contenteditable>${translate(c.mission.sortie, c.dictionary) || 'BRIEFING'}</span></div>`,
}

export default component;