'use client';
import ProductStyles from './ProductStyles';
import styles from './styles.module.scss';
import { productStyles } from 'config/models';


export default function Styles() {
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
            />)}
        </div>
    )
}
