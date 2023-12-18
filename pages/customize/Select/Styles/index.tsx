'use client';
import { TCollar } from 'slices/accentSlice';
import ProductStyles from './ProductStyles';
import styles from './styles.module.scss';
import { productStyles } from 'config/models';
import { IStyles } from './ProductStyles/product-style.interface';

export default function Styles({collarAccent, cuffAccent}: IStyles) {
    return (
        <div className={styles.styles__container}>
            {productStyles.map((product, i) => 
            <ProductStyles key={`product-style-${i}`} 
            type='style'
            label={product.label} 
            childrens={product.childrens} 
            code={product.code} 
            setShowAccentFebricModel={() => null}
            showAccentFebricModel={false}
            collarAccent={collarAccent}
            cuffAccent={cuffAccent}
            />)}
        </div>
    )
}
