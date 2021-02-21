export interface IArtifact {
    name: string;
    id: string;
    rarity: number;
    two_piece_bonus: string;
    four_piece_bonus: string;
    domain: {
        name: string;
        drops_max: Array<[]>
    };
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

