import React from 'react';
import styles from '../Styles/styles.module.scss';
import ProductStyles from '../Styles/ProductStyles';
import { accentsStyles } from 'config/models';
import { IAccents } from 'interface/IProductStyle.interface';

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
