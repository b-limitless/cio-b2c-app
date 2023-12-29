import React from 'react';
import styles from '../Styles/styles.module.scss';
import ProductStyles from '../Styles/ProductStyles';
import { accentsStyles } from 'config/models';
import { IAccents } from 'interface/IProductStyle.interface';
// In acces object we will not have the febric prople for childrens props
// Because when user select for example type = default collor | put febric in whole collar
// Or user wants only to put the different febric in collor back side based on that 
// We have to update the febric

// Same example goes to the cuff as well, default cuff, febric over all cuff, febric inside cuff 
// You need to manage state which is febric and which type is users is selected




export default function Accents({ setShowAccentFebricModel, showAccentFebricModel, setActiveAccent }: IAccents) {
    return (
        <div className={styles.styles__container}>
            {accentsStyles.map((accent, i) =>
                <ProductStyles key={`product-style-${i}`}
                    label={accent.label}
                    childrens={accent.childrens}
                    code={accent.code}
                    setShowAccentFebricModel={setShowAccentFebricModel}
                    showAccentFebricModel={showAccentFebricModel}
                    type='accent'
                    setActiveAccent={setActiveAccent}
                />)}

        </div>
    )
}
