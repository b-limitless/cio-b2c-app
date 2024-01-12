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
    measurement: IShirtMeasurement;
    errors: IShirtMeasurement;
    onMouseLeaveEventHandler:Function;
    onChangeHandler: Function;
}

export default function ProductShirt({errors, measurement, onMouseLeaveEventHandler, onChangeHandler }: IProductShirt) {
    console.log('measurment', measurement)
    return (
        <>
            <div className={styles.form__row}>
                <NumberInputField 
                name='neck' 
                label='Neck' 
                onChange={(e: any) => onChangeHandler(e)}
                value={measurement?.neck ?? ''}
                error={errors?.neck}
                onBlur={() => onMouseLeaveEventHandler('neck', measurement.neck)}
                helperText={errors?.neck}
                />
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
