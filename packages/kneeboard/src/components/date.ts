
import { Component, Context } from "..";
import './date.css';

const component: Component = {
  id: 'date',
  render: (c: Context) => `${c.mission.date.Month}/${c.mission.date.Day}/${c.mission.date.Year}`,
}

export default component;