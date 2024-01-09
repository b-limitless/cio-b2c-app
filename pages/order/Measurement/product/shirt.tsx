import Input from 'components/Input';
import styles from '../measurement.module.scss';
import { IShirtMeasurement } from 'interface/IShirtMeasurement';
import { IPantMeasurement } from 'interface/IPantMeasurement';

export const NumberInputField = ({ ...rest }) => {
    return <Input 
        {...rest} 
        type='number' 
        // error={true}
         />;
}

interface IProductShirt {
    onChange: Function;
    measurement: IShirtMeasurement | IPantMeasurement;
    errors: IShirtMeasurement | IPantMeasurement;
}

export default function ProductShirt({ measurement }: IProductShirt) {
    return (
        <>
            <div className={styles.form__row}>
                <NumberInputField name='neck' label='Neck' />
                <NumberInputField name='sleevLenength' label='Sleev Length' />
                <NumberInputField name='solderWidth' label='Solder Width' />

            </div>
            <div className={styles.form__row}>
                <NumberInputField name='chestAround' label='Chest Around' />
                <NumberInputField name='stomatch' label='Stomatch' />
                <NumberInputField name='bicepAround' label='Bicep Around' />

            </div>
            <div className={styles.form__row}>
                <NumberInputField name='trosoLength' label='Troso Length' />
                <NumberInputField name='hips' label='Hips' />
                <NumberInputField name='wrist' label='Wrist' />
            </div>


        </>

    )
}
