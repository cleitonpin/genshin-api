
type domain = {
  name: string;
  drops_max: string[]
}

export interface IArtifact {
  name: string;
  id: string;
  rarity: number;
  two_piece_bonus: string;
  four_piece_bonus: string;
  domain: domain;
}

export interface ICharacter {
  id: string;
  name: string;
  description: string;
  vision: string;
  weapon: string;
  rariry: number;
  skillTalents: Array<object>;
  passiveTalents: Array<object>;
  constellations: Array<object>;
}

export interface IWeapon {
  name: string;
  type: string;
  rarity: number;
  baseAttack: string;
  subStat: string;
  passiveName: string;
  passiveDesc: string;
  location: string;
}

interface ICommonEliteEnemies {
  name: string;
  type: string[];
  faction: string;
  location: string;
  drops: object | string;
}

type drops = string[] | object;

type IWildLifeEnemies = {
  name: string;
  types: object;
  drops: drops
}

export interface IEnemies {
  commonEnemies: Array<ICommonEliteEnemies>;
  eliteEnemies: Array<ICommonEliteEnemies>;
  wildlife: Array<IWildLifeEnemies>;
}

export interface IRecipes {
  name: string;
  rarity: string;
  foodrecipetype: string;
  effect: string;
  description: string;
  buffs: string[];
  images: {
    image: string;
  };
  ingredientes: string[];
  source: string;
  base: string;
  cook: string;
}