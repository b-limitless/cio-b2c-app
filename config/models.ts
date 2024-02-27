export const defaultPrices = {
  collar: 10,
  cuff: 10,
};
export const modelsURL = {
  // shirt: '/models/shirt/shirt-without-collar-and-cuff.glb',
  shirt: '/models/shirt/shirt-v1.glb',
  
};

export const productStyles = [
  {
    label: 'collars',
    code: 'collar',
    childrens: [
      {
        id: 1,
        label: 'button down',
        code: 'button_down',
        mediaUrl: '/icon/collars/button-down.svg',
        modelURL: `/models/collars/collar-3-3.glb`,
        iconClass: 'icon-65'
      },
      {
        id: 2,
        label: 'club',
        code: 'club',
        mediaUrl: '/icon/collars/club.svg',
        modelURL: `/models/collars/collar-2-2.glb`,
        iconClass: 'icon-65'
      },
      {
        id: 3,
        label: 'cutway',
        code: 'cutway',
        mediaUrl: '/icon/collars/cutway.svg',
        modelURL: `/models/collars/collar-1-1.glb`,
        iconClass: 'icon-62'
      },
    ],
  },
  {
    label: 'cuffs',
    code: 'cuff',
    childrens: [
      {
        id: 5,
        label: 'french',
        code: 'button_down',
        mediaUrl: '/icon/cuff/french.svg',
        modelURL: `/models/cuffs/cuff-1-normal.glb`,
        iconClass: 'icon-62'
      },
      {
        id: 6,
        label: 'one button',
        code: 'one_button',
        mediaUrl: '/icon/cuff/one-button.svg',
        modelURL: `/models/cuffs/cuff-2-normal.glb`,
        iconClass: 'icon-62'
      },
      {
        id: 7,
        label: 'three button',
        code: 'button_down',
        mediaUrl: '/icon/cuff/three-button.svg',
        modelURL: `/models/cuffs/cuff-3-normal.glb`,
        iconClass: 'icon-62'
      },
    ],
  },
];

export const accentsStyles = [
  {
    label: 'Contrasted Collor',
    code: 'collar',
    childrens: [
      {
        id: 1,
        label: 'By Default',
        code: 'button_down',
        mediaUrl: '/icon/collars/button-down.svg',
        type: 'default',
        meshName: [],
        price: defaultPrices.collar,
      },
      {
        id: 2,
        label: 'All',
        code: 'all',
        mediaUrl: '/icon/collars/button-down.svg',
        type: 'all',
        meshName: ['Collar_Top', 'Collor_Button_Holder', 'Collor_Inner', 'Node_5'],
        price: defaultPrices.collar + 10,
      },
      {
        id: 3,
        label: 'Inner Febric($2)',
        code: 'innerFebric',
        mediaUrl: '/icon/collars/button-down.svg',
        type: 'innerFebric',
        meshName: ['Collor_Inner'],
        price: defaultPrices.collar + 10,
      },
    ],
  },
  {
    label: 'Contrasted cuff',
    code: 'cuff',
    childrens: [
      {
        id: 5,
        label: 'By Default',
        code: 'default',
        mediaUrl: '/icon/cuff/french.svg',
        type: 'default',
        meshName: [],
      },
      {
        id: 6,
        label: 'All',
        code: 'all',
        mediaUrl: '/icon/cuff/one-button.svg',
        type: 'all',
        meshName: [],
      },
      {
        id: 7,
        label: 'Inner Febric',
        code: 'innerFebric',
        mediaUrl: '/icon/cuff/three-button.svg',
        type: 'innerFebric',
        meshName: [],
      },
    ],
  },
];

export const accentFebrics = [
  {
    febricURI: '/img/febric1.jpg',
    price: 10,
  },
  {
    febricURI: '/img/febric-5.jpg',
    price: 20,
  },
  {
    febricURI: '/img/febric-6.jpg',
    price: 30,
  },
];
