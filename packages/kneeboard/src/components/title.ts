import { translate } from '@dcs-web-editor-mono/utils'

import { Component, Context } from "..";

const component: Component = {
  id: 'title',
  template: `<h2 id="title" class="center"></h2>`,
  render: (c: Context) => translate(c.mission.sortie, c.dictionary) || 'BRIEFING',
}

export default component;