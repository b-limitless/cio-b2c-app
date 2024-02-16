import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { defaultFebric } from 'config/default';

const febricSample = {
  characters: ['Breathable', 'Durable', 'Soft'],
  compositions: [
    {
      component: 'Silk',
      percentage: 63,
    },
    {
      component: 'Cotton',
      percentage: 38,
    },
    {
      component: 'Cotton',
      percentage: 63,
    },
    {
      component: 'Silk',
      percentage: 85,
    },
    {
      component: 'Polyester',
      percentage: 3,
    },
    {
      component: 'Other',
      percentage: 16,
    },
  ],
  userId: '65aa90cc181f5b0656d73e44',
  title: 'Dr',
  price: 144.82,
  deliveryTime: '5-7 business days',
  excellence: 'Low',
  warmth: 'Medium',
  weight: 'Heavy',
  threadStyle: 'Smooth',
  brightness: 'Neutral',
  superShiny: false,
  tone: 'Cool',
  opacity: 'Opaque',
  waterproof: 'true',
  stretchyText: 'High Stretch',
  stretchy: 'true',
  type: 'Metal',
  febricTypes: 'Wool',
  febricSeasons: 'Summer',
  threadTypes: 'Textured',
  threadCounts: '600 TC',
  thumbnailImageUrl:
    'https://res.cloudinary.com/dun5p8e5d/image/upload/v1706100128/cio-assets/img/premium-linen-fabric-fabric-dusty-mint-green-plain-premium-60-lea-pure-linen-shirting-fabric-width-58-inches-36564388282543_fi7kry.jpg',
  originalImageUrl:
    'https://res.cloudinary.com/dun5p8e5d/image/upload/v1706100126/cio-assets/img/fabric-pandit-fabric-denim-blue-plain-premium-60-lea-pure-linen-fabric-width-58-inch-36447226626223_whnopu.jpg',
  version: 0,
  id: '65b25738d8db760157740560',
  model:'', 
  material: 'Cotton',
  season: 'summer',
  label: 'default',
  code: 'default',
  
};

// export type TFebric = {
//   title: string;
//   price: number;
//   material?: string;
//   tone?: string;
//   febricTypes?: string;
//   id: number;
//   model: string;
//   originalImageUrl?: string;
//   code?: string;
//   label?: string;
//   season?: string;
// };

export type TBaseFebric = typeof febricSample;
export type TFebric = Partial<TBaseFebric>

const initialState: TFebric = {
  id: '65b25738d8db760157740560',
  model: defaultFebric,
  price: 10,
  title: '',
  material: 'Cotton',
  tone: 'light',
  febricTypes: 'Cotton',
  season: 'summer',
  label: 'default',
  code: 'default',
  originalImageUrl: defaultFebric,
};

const febricSlice = createSlice({
  name: 'febric',
  initialState,
  reducers: {
    updateFebric: (state: TFebric, action: PayloadAction<TFebric>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFebric } = febricSlice.actions;
export default febricSlice.reducer;
