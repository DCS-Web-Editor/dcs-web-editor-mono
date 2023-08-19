import { translate } from '@dcs-web-editor-mono/utils'
import {startCase, upperCase} from 'lodash';

import { Component, Context } from "..";
import './coalitionTask.css';

const component: Component = {
  id: 'coalition-task',
  template: `<p id="coalition-task"></p>`,
  render: (c: Context) => {
    const taskName = `description${startCase(c.coalitionName)}Task`
    return `<b>${upperCase(c.coalitionName)} TASK</b> <textarea>${translate(c.mission[taskName], c.dictionary)}</textarea>`
  },
}

export default component;