export const defaultPrices = {
  collar: 10,
  cuff: 10,
};
export const modelsURL = {
  // shirt: '/models/shirt/shirt-without-collar-and-cuff.glb',
  // shirt: '/models/shirt/MainGLBNew.glb',
  // shirt: '/models/shirt/Metres.glb',
  shirt: '/models/shirt/shirt-v3-darco.glb',
  buttonsWholes: '/models/shirt/buttons-wholes.glb',
  buttons: '/models/button/buttons-draco.glb',
  singleCuffOneButton: '/models/cuffs/buttons/single-cuff-1-button.glb', 
  pocket: '/models/shirt/pocket.glb',
  frontPlacket: '/models/shirt/front-placket.glb',
  
};

export enum EStyles {
  Collar='collar', 
  Cuff='cuff', 
  Chestpocket='chestpocket'
}

export enum EAccent {
  ButtonWholeStitch='buttonWholeAndStitch', 
  Collar='collar',
  Cuff='cuff', 
  ButtonColors='buttonColors', 
  FrontPlacket='frontPlacket'
}


export enum EAccentChildrens {
  Default='DefaultButtonWholeColor',
  All='ButtonWholeColorAll',
  CuffOnly='ButtonWholeColorCuffOnly'
}

export enum EAccentButtonColor {
  Default='ButtonColorDefault',
  All='ButtonColorAll',
  CuffOnly='ButtonColorCuffOnly'
}

export enum EAccentFrontPacket {
  Default='defaultFrontPacket',
  All='allFrontPacket',
}

export const productStyles = [
  {
    label: 'collars',
    code: EStyles.Collar,
    childrens: [
      {
        id: 1,
        label: 'button down',
        code: 'button_down',
        mediaUrl: '/icon/collars/button-down.svg',
        modelURL: `/models/collars/collar-button-down.glb`,
        iconClass: 'icon-65',
        buttonsMeshNames:['MatShape_21501_Node', 'MatShape_21509_Node'], 
        buttonWholeMeshNames:['Collar_2_Node', 'Collar_1_Node']
      },
      {
        id: 2,
        label: 'club',
        code: 'club',
        mediaUrl: '/icon/collars/club.svg',
        modelURL: `/models/collars/collar-2-2.glb`,
        iconClass: 'icon-59', 
        buttonsMeshNames:[], 
        buttonWholeMeshNames:[]
      },
      {
        id: 3,
        label: 'cutway',
        code: 'cutway',
        mediaUrl: '/icon/collars/cutway.svg',
        modelURL: `/models/collars/collar-1-draco.glb`,
        iconClass: 'icon-62', 
        buttonsMeshNames:[], 
        buttonWholeMeshNames:[]
      },
      {
        id: 3,
        label: 'stand up',
        code: 'standup',
        mediaUrl: '/icon/collars/cutway.svg',
        modelURL: `/models/collars/collar-1-1.glb`,
        iconClass: 'icon-66', 
        buttonsMeshNames:[], 
        buttonWholeMeshNames:[]
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
    code: EStyles.Cuff,
    childrens: [
      {
        id: 5,
        label: 'single 1 button',
        code: 'single_cuff',
        mediaUrl: '/icon/cuff/french.svg',
        modelURL: `/models/cuffs/cuff-1-draco.glb`,
        iconClass: 'icon-68', 
        buttonsMeshNames:['MatShape_21501_Node', 'MatShape_21509_Node'], 
        buttonWholeMeshNames:['Collar_2_Node', 'Collar_1_Node']
      },
      {
        id: 6,
        label: 'double 2 buttons',
        code: '2_buttons',
        mediaUrl: '/icon/cuff/one-button.svg',
        modelURL: `/models/cuffs/two-buttons-cuff.glb`,
        iconClass: 'icon-69',
        buttonsMeshNames:['MatShape_360712_Node', 'MatShape_360720_Node', 'MatShape_118371_Node', 'MatShape_206902_Node'], 
        buttonWholeMeshNames:['MatShape_363070_Node', 'MatShape_363078_Node', 'Cuffs_13_Node', 'Cuffs_14_Node']
      },
      {
        id: 7,
        label: 'two button cut',
        code: 'two_button_cut',
        mediaUrl: '/icon/cuff/three-button.svg',
        modelURL: `/models/cuffs/cuff-1-draco.glb`,
        iconClass: 'icon-76'
      },
      {
        id: 7,
        label: 'rounded 1 button',
        code: 'rounded_1_button',
        mediaUrl: '/icon/cuff/three-button.svg',
        modelURL: `/models/cuffs/cuff-1-draco.glb`,
        iconClass: 'icon-77'
      }, 
      {
        id: 7,
        label: 'double squared',
        code: 'double_squared',
        mediaUrl: '/icon/cuff/three-button.svg',
        modelURL: `/models/cuffs/cuff-1-draco.glb`,
        iconClass: 'icon-78'
      }
    ],
  },
  {
    label: 'Chestpocket',
    code: EStyles.Chestpocket, 
    childrens: [
      {
        id: null,
        label: 'No Poacket',
        code: 'no_pocket',
        iconClass: 'icon-57'
      }, 
      {
        id: 1,
        label: 'Standard',
        code: 'standard',
        iconClass: 'icon-70'
      }
    ]
  }
];

export const accentsStyles = [
  {
    label: 'Contrasted Collor',
    code: EAccent.Collar,
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
        meshName: ['Collar_Node', 'Collar_Stand_Node', 'MatShape_1135259_Node', 'Node_25'],
        price: defaultPrices.collar + 10,
        iconClass: 'icon-42'
      },
      {
        id: 3,
        label: 'Inner Febric($2)',
        code: 'innerFebric',
        mediaUrl: '/icon/collars/button-down.svg',
        type: 'innerFebric',
        meshName: ['Collar_Node'],
        price: defaultPrices.collar + 10,
        iconClass: 'icon-41'
      },
    ],
  },
  {
    label: 'Contrasted cuff',
    code: EAccent.Cuff,
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
        meshName: ['Cuffs_1_Node', 'Cuffs_Node', 'Node_39', 'Node_43', 'Cuffs_3_Node', 'Cuffs_2_Node'],
        iconClass: 'icon-45'
      },
      {
        id: 7,
        label: 'Inner Febric',
        code: 'innerFebric',
        mediaUrl: '/icon/cuff/three-button.svg',
        type: 'innerFebric',
        meshName: ['Cuffs_3_Node', 'Cuffs_2_Node'],
        iconClass: 'icon-44'
      },
    ],
  },
  {
    label: 'Contrasting button whole/stitch',
    code: EAccent.ButtonWholeStitch, 
    childrens: [
      {
        id: 1,
        label: 'default',
        code: EAccentChildrens.Default,
        mediaUrl: '/icon/collars/button-down.svg',
        type: 'default',
        meshName: [],
        price: defaultPrices.collar,
        iconClass: 'icon-55'
      }, 
      {
        id: 2,
        label: 'All',
        code: EAccentChildrens.All,
        mediaUrl: '/icon/collars/button-down.svg',
        type: EAccentChildrens.All,
        meshName: [],
        price: defaultPrices.collar,
        iconClass: 'icon-52'
      }, 
      // {
      //   id: 3,
      //   label: 'Cuff Only',
      //   code: EAccentChildrens.CuffOnly,
      //   mediaUrl: '/icon/collars/button-down.svg',
      //   type: EAccentChildrens.CuffOnly,
      //   meshName: [],
      //   price: defaultPrices.collar,
      //   iconClass: 'icon-78'
      // }
    ]
  }, 
  {
    label: 'Button colors',
    code: EAccent.ButtonColors, 
    childrens: [
      {
        id: 1,
        label: 'default',
        code: EAccentButtonColor.Default,
        mediaUrl: '/icon/collars/button-down.svg',
        type: EAccentButtonColor.Default,
        meshName: [],
        price: defaultPrices.collar,
        iconClass: 'icon-53'
      }, 
      {
        id: 2,
        label: 'All',
        code: EAccentButtonColor.All,
        mediaUrl: '/icon/collars/button-down.svg',
        type: EAccentButtonColor.All,
        meshName: [],
        price: defaultPrices.collar,
        iconClass: 'icon-21'
      },
    ]
  }, 
  {
    label: 'Front Packet',
    code: EAccent.FrontPlacket, 
    childrens: [
      {
        id: 1,
        label: 'default',
        code: EAccentFrontPacket.Default,
        mediaUrl: '/icon/collars/button-down.svg',
        type: EAccentFrontPacket.Default,
        meshName: [],
        price: defaultPrices.collar,
        iconClass: 'icon-52'
      }, 
      {
        id: 2,
        label: 'All',
        code: EAccentFrontPacket.All,
        mediaUrl: '/icon/collars/button-down.svg',
        type: EAccentFrontPacket.All,
        meshName: [],
        price: defaultPrices.collar,
        iconClass: 'icon-58'
      },
    ]
  },
  
];

export const accentFebrics:any = [
  {
    febricURI: '/img/febric-22.webp',
    originalImageUrl: '/img/febric-22.webp',
    price: 10,
  },
  {
    febricURI: '/img/febric-23.webp',
    originalImageUrl: '/img/febric-23.webp',
    price: 20,
  },
  {
    febricURI: '/img/febric-6.jpg',
    originalImageUrl: '/img/febric-6.jpg',
    price: 30,
  },
];
