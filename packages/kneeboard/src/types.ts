export interface Component {
  template?: boolean;
  render: (c: Context) => string | Promise<any>;
  id: string;
  control?: string;
  hasContent?: Function;
}

export interface Context {
  unitName: string;
  groupName: string;
  category: string;
  countryName: string;
  coalitionName: string;
  mission: any;
  dictionary: any;
  coalition: any;
  countries: any;
  country: any;
  groups: any;
  group: any;
  unit: any;
  declination: Function;
}
