import ProductStyles from './ProductStyles';
import styles from './styles.module.scss';

// Defining the data for the styles
const productStyles = [{
    label: 'collars',
    code: 'collars',
    childrens: [
        {
            label: 'button down',
            code: 'button_down',
            mediaUrl: '/icon/collars/button-down.svg'
        },
        {
            label: 'club',
            code: 'club',
            mediaUrl: '/icon/collars/club.svg'
        },
        {
            label: 'cutway',
            code: 'cutway',
            mediaUrl: '/icon/collars/cutway.svg'
        },
        {
            label: 'straight',
            code: 'straight',
            mediaUrl: '/icon/collars/straight.svg'
        }
    ]
},
{
    label: 'cuff',
    code: 'cuff',
    childrens: [
        {
            label: 'french',
            code: 'button_down',
            mediaUrl: '/icon/cuff/french.svg'
        },
        {
            label: 'one button',
            code: 'one_button',
            mediaUrl: '/icon/cuff/one-button.svg'
        },
        {
            label: 'three button',
            code: 'button_down',
            mediaUrl: '/icon/cuff/three-button.svg'
        },
        {
            label: 'two button',
            code: 'two_button',
            mediaUrl: '/icon/cuff/two-button.svg'
        }
    ]
}
]

export default function Styles() {
    return (
        <div className={styles.styles__container}>
            {productStyles.map((product, i) => <ProductStyles key={`product-style-${i}`} label={product.label} childrens={product.childrens} code={product.code} />)}
        </div>
    )
}
