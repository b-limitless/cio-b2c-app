export const defaultPrices = {
  collar: 10,
  cuff: 10,
};
export const modelsURL = {
  // shirt: '/models/shirt/shirt-without-collar-and-cuff.glb',
  // shirt: '/models/shirt/MainGLBNew.glb',
  // shirt: '/models/shirt/Metres.glb',
  shirt: '/models/shirt/shirt-without-cuff-and-collar-1.glb',
  
  
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
        iconClass: 'icon-59'
      },
      {
        id: 3,
        label: 'cutway',
        code: 'cutway',
        mediaUrl: '/icon/collars/cutway.svg',
        modelURL: `/models/collars/collar-1.glb`,
        iconClass: 'icon-62'
      },
      {
        id: 3,
        label: 'stand up',
        code: 'standup',
        mediaUrl: '/icon/collars/cutway.svg',
        modelURL: `/models/collars/collar-1-1.glb`,
        iconClass: 'icon-66'
      }, 
      {
        id: 3,
        label: 'wing',
        code: 'wing',
        mediaUrl: '/icon/collars/cutway.svg',
        modelURL: `/models/collars/collar-1-1.glb`,
        iconClass: 'icon-67'
      }, 
      {
        id: 3,
        label: 'rounded',
        code: 'rounded',
        mediaUrl: '/icon/collars/cutway.svg',
        modelURL: `/models/collars/collar-1-1.glb`,
        iconClass: 'icon-64'
      }
    ],
  },
  {
    label: 'cuffs',
    code: 'cuff',
    childrens: [
      {
        id: 5,
        label: 'single 1 button',
        code: 'single_cuff',
        mediaUrl: '/icon/cuff/french.svg',
        modelURL: `/models/cuffs/cuff-1.glb`,
        iconClass: 'icon-68'
      },
      {
        id: 6,
        label: 'double 2 buttons',
        code: '2_buttons',
        mediaUrl: '/icon/cuff/one-button.svg',
        modelURL: `/models/cuffs/cuff-1.glb`,
        iconClass: 'icon-69'
      },
      {
        id: 7,
        label: 'two button cut',
        code: 'two_button_cut',
        mediaUrl: '/icon/cuff/three-button.svg',
        modelURL: `/models/cuffs/cuff-1.glb`,
        iconClass: 'icon-76'
      },
      {
        id: 7,
        label: 'rounded 1 button',
        code: 'rounded_1_button',
        mediaUrl: '/icon/cuff/three-button.svg',
        modelURL: `/models/cuffs/cuff-1.glb`,
        iconClass: 'icon-77'
      }, 
      {
        id: 7,
        label: 'double squared',
        code: 'double_squared',
        mediaUrl: '/icon/cuff/three-button.svg',
        modelURL: `/models/cuffs/cuff-1.glb`,
        iconClass: 'icon-78'
      }
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
        label: 'default',
        code: 'default',
        mediaUrl: '/icon/collars/button-down.svg',
        type: 'default',
        meshName: [],
        price: defaultPrices.collar,
        iconClass: 'icon-62'

      },
      {
        id: 2,
        label: 'All',
        code: 'all',
        mediaUrl: '/icon/collars/button-down.svg',
        type: 'all',
        meshName: ['Collar_Top', 'Collor_Button_Holder', 'Collor_Inner', 'Node_5'],
        price: defaultPrices.collar + 10,
        iconClass: 'icon-42'
      },
      {
        id: 3,
        label: 'Inner Febric($2)',
        code: 'innerFebric',
        mediaUrl: '/icon/collars/button-down.svg',
        type: 'innerFebric',
        meshName: ['Collor_Inner'],
        price: defaultPrices.collar + 10,
        iconClass: 'icon-41'
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
        iconClass: 'icon-77'
      },
      {
        id: 6,
        label: 'All',
        code: 'all',
        mediaUrl: '/icon/cuff/one-button.svg',
        type: 'all',
        meshName: [],
        iconClass: 'icon-45'
      },
      {
        id: 7,
        label: 'Inner Febric',
        code: 'innerFebric',
        mediaUrl: '/icon/cuff/three-button.svg',
        type: 'innerFebric',
        meshName: [],
        iconClass: 'icon-44'
      },
    ],
  },
  {
    label: 'Contrasting button whole/stitch',
    code: 'cbws', 
    childrens: [

    ]
  }, 
  {
    label: 'Button colors',
    code: 'button-colors', 
    childrens: [
      
    ]
  }
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
