import { translate } from '@dcs-web-editor-mono/utils'

import { Component, Context } from "..";

const component: Component = {
  id: 'title',
  render: (c: Context) => `<h2 class="center"><div contenteditable>${translate(c.mission.sortie, c.dictionary) || 'BRIEFING'}</h2></div>`,
}

export default component;