import mongoose, { model } from 'mongoose'
import { ICharacter } from '../interfaces'

const CharacterSchema = new mongoose.Schema<ICharacter>({
  name: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  rarity: {
    type: Number,
    required: true,
  },
  constellations: [
    {
      name: {
        type: String,
        required: true,
      },
      unlock: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
  passiveTalents: [
    {
      name: {
        type: String,
        required: true,
      },
      unlock: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
  skillTalents: [
    {
      name: {
        type: String,
        required: true,
      },
      unlock: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
  upgrades: [
    {
      rank: {
        type: String,
        required: false,
      },
      level: {
        type: String,
        required: false,
      },
      cost: {
        type: String,
        required: false,
      },
      material_one: {
        name: {
          type: String,
          required: false,
        },
        icon: {
          type: String,
          required: false,
        },
      },
      material_two: {
        name: {
          type: String,
          required: false,
        },
        icon: {
          type: String,
          required: false,
        },
      },
      material_three: {
        name: {
          type: String,
          required: false,
        },
        icon: {
          type: String,
          required: false,
        },
      },
      material_four: {
        name: {
          type: String,
          required: false,
        },
        icon: {
          type: String,
          required: false,
        },
      },
    },
  ],
  icon: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  weapon: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
})

export const Character = model<ICharacter>('Character', CharacterSchema)
