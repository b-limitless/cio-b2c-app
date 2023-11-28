import React from 'react';
import styles from '../Styles/styles.module.scss';
import ProductStyles from '../Styles/ProductStyles';
// In acces object we will not have the febric prople for childrens props
// Because when user select for example type = default collor | put febric in whole collar
// Or user wants only to put the different febric in collor back side based on that 
// We have to update the febric

// Same example goes to the cuff as well, default cuff, febric over all cuff, febric inside cuff 
// You need to manage state which is febric and which type is users is selected
const accentsStyles = [{
  label: 'Contrasted Collor',
  code: 'collars',
  childrens: [
      {
          id: 1,
          label: 'By Default',
          code: 'button_down',
          mediaUrl: '/icon/collars/button-down.svg',
      },
      {
          id: 2,
          label: 'All',
          code: 'club',
          mediaUrl: '/icon/collars/club.svg', 
        
      },
      {
          id:3,
          label: 'Inner Febric($2)',
          code: 'cutway',
          mediaUrl: '/icon/collars/cutway.svg',
      },
      // {
      //     id:4,
      //     label: 'straight',
      //     code: 'straight',
      //     mediaUrl: '/icon/collars/straight.svg', 
      //     febric: '/models/collars/collar-1.glb'
      // }
  ]
},
{
  label: 'Contrasted cuff',
  code: 'cuff',
  childrens: [
      {
          id:5,
          label: 'french',
          code: 'button_down',
          mediaUrl: '/icon/cuff/french.svg'
      },
      {
          id:6,
          label: 'one button',
          code: 'one_button',
          mediaUrl: '/icon/cuff/one-button.svg'
      },
      {
          id:7,
          label: 'three button',
          code: 'button_down',
          mediaUrl: '/icon/cuff/three-button.svg'
      },
      // {
      //     id:8,
      //     label: 'two button',
      //     code: 'two_button',
      //     mediaUrl: '/icon/cuff/two-button.svg'
      // }
  ]
}
]

export default function Accents() {
  return (
    <div className={styles.styles__container}>
            {accentsStyles.map((accent, i) => 
            <ProductStyles key={`product-style-${i}`} 
            label={accent.label} 
            childrens={accent.childrens} 
            code={accent.code} />)}
        </div>
  )
}
