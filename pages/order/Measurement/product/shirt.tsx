import Input from 'components/Input';
import InputWithTooltip from 'components/Input/InputWithToltip';
import { IShirtMeasurement } from 'interface/IShirtMeasurement';
import styles from '../measurement.module.scss';

export const NumberInputField = ({ ...rest }) => {
    return <Input
        {...rest}
        type='number'
    // error={true}
    />;
}

interface IProductShirt {

    measurement: IShirtMeasurement;
    errors: IShirtMeasurement;
    onMouseLeaveEventHandler: Function;
    onChangeHandler: Function;
}




export default function ProductShirt({ errors, measurement, onMouseLeaveEventHandler, onChangeHandler }: IProductShirt) {

    const LongText = <span>Nullam eget est sed sem iaculis gravida eget vitae justo <a href='google.com'>Watch video</a></span>

   

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
                <NumberInputField
                    name='sleevLenength'
                    label='Sleev Length'
                    onChange={(e: any) => onChangeHandler(e)}
                    value={measurement?.sleevLength ?? ''}
                    error={errors?.sleevLength}
                    onBlur={() => onMouseLeaveEventHandler('sleevLength', measurement.sleevLength)}
                    helperText={errors?.sleevLength}
                />
                <NumberInputField name='shoulderWidth'
                    label='Solder Width'
                    onChange={(e: any) => onChangeHandler(e)}
                    value={measurement?.shoulderWidth ?? ''}
                    error={errors?.shoulderWidth}
                    onBlur={() => onMouseLeaveEventHandler('shoulderWidth', measurement.shoulderWidth)}
                    helperText={errors?.shoulderWidth}
                />

            </div>
            <div className={styles.form__row}>
                <NumberInputField name='chestAround'
                    label='Chest Around'
                    onChange={(e: any) => onChangeHandler(e)}
                    value={measurement?.chestAround ?? ''}
                    error={errors?.chestAround}
                    onBlur={() => onMouseLeaveEventHandler('chestAround', measurement.chestAround)}
                    helperText={errors?.chestAround}
                />
                <NumberInputField
                    name='stomach'
                    label='Stomatch'
                    value={measurement?.stomach ?? ''}
                    error={errors?.stomach}
                    onBlur={() => onMouseLeaveEventHandler('stomach', measurement.stomach)}
                    helperText={errors?.stomach}
                />
                <NumberInputField
                    name='bicepAround'
                    label='Bicep Around'
                    value={measurement?.bicepAround ?? ''}
                    error={errors?.bicepAround}
                    onBlur={() => onMouseLeaveEventHandler('bicepAround', measurement.bicepAround)}
                    helperText={errors?.bicepAround}
                />

            </div>
            <div className={styles.form__row}>
                <NumberInputField
                    name='torsoLength'
                    label='Troso Length'
                    value={measurement?.torsoLength ?? ''}
                    error={errors?.torsoLength}
                    onBlur={() => onMouseLeaveEventHandler('torsoLength', measurement.torsoLength)}
                    helperText={errors?.torsoLength}
                />
                <NumberInputField 
                name='hips' 
                label='Hips' 
                value={measurement?.hips ?? ''}
                error={errors?.hips}
                onBlur={() => onMouseLeaveEventHandler('hips', measurement.hips)}
                helperText={errors?.hips}
                />
                <NumberInputField 
                    name='wrist' 
                    label='Wrist' 
                    value={measurement?.wrist ?? ''}
                    error={errors?.wrist}
                    onBlur={() => onMouseLeaveEventHandler('wrist', measurement.wrist)}
                    helperText={errors?.wrist}
                />

            </div>
            <div className={styles.form__row}>
                {/* <InputIcon/>
                <InputIcon/>
                <InputIcon/> */}
                <InputWithTooltip label='neck' toltip toltipText={LongText}/>
            </div>



        </>

    )
}
