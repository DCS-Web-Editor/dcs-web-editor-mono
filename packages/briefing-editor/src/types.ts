export interface IBriefingImages {
  pictureFileNameB: string[];
  pictureFileNameN: string[];
  pictureFileNameR: string[];
}

export interface IMapResourceInit {
  id: string;
  name: string;
}

export interface IMapResourceFinal {
  [key: string]: string;
}

export interface IBriefing {
  maxDictId: number;
  DictKey_descriptionText_1: string; // Situation
  DictKey_descriptionRedTask_2: string;
  DictKey_descriptionBlueTask_3: string;
  DictKey_descriptionNeutralsTask_4: string;
  DictKey_sortie_5: string;
}
