import Input from 'components/Input'
import React from 'react'
import styles from '../measurement.module.scss';
import Select from 'components/Select';
import { IMeasurementBase } from 'interface/IMeasurementBase';

const countEleven = new Array(10).fill(0);
const ages = [{ name: "0-18", value: "0-18" }];
const height = [{ name: 5, value: 5 }];
const inches = countEleven.map((item, i) => {
    return { name: i }
})

interface IBaseProductMeasurementForm {
    onChangeHandler: Function;
    formData: IMeasurementBase;
    errors: IMeasurementBase;
    onMouseLeaveEventHandler:Function;
}
export default function BaseProductMeasurementForm({ onChangeHandler, formData, errors, onMouseLeaveEventHandler }: IBaseProductMeasurementForm) {

    return (
        <>
            <div className={styles.form__row}>
                <Input label='Full Name'
                    name='fullName'
                    onChange={(e:any) => onChangeHandler(e)}
                    value={formData?.fullName ?? ''}
                    error={errors?.fullName}
                    onBlur={() => onMouseLeaveEventHandler('fullName', formData.fullName)}
                    helperText={errors?.weight}
                />
            </div>
            <p className={styles.unite}>
                Change Unite feet/lb or cm/kg
            </p>
            <div className={styles.form__row}>
                <Input
                    // options={height}
                    type='number'
                    name='feet'
                    value={formData?.feet ?? 0}
                    label='Height/Feet'
                    onChange={onChangeHandler}
                    error={errors?.feet}
                    helperText={errors?.weight}
                    onBlur={() => onMouseLeaveEventHandler('feet', formData.feet)}
        
                />
                <Select
                    name='inch'
                    options={inches}
                    value={formData.inch ?? 0}
                    label='inch'
                    onChange={onChangeHandler}
                    error={errors?.inch}
                    helperText={errors?.weight}
                    onBlur={() => onMouseLeaveEventHandler('inch', formData.inch)}
                />

                <Input
                    name='weight'
                    type='number'
                    value={formData.weight}
                    label='Weight in KG'
                    onChange={onChangeHandler}
                    error={errors?.weight}
                    helperText={errors?.weight}
                    onBlur={() => onMouseLeaveEventHandler('weight', formData.weight)}
                />

                {/* <Select
                options={[]}
                value=''
                label='Weight in KG'
                onChange={() => { }}

                /> */}
                <Input
                    // options={ages}
                    value={formData.age}
                    name='age'
                    label='Age'
                    type='number'
                    onChange={onChangeHandler}
                    error={errors?.age}
                    onBlur={() => onMouseLeaveEventHandler('age', formData.age)}
                />
            </div>
            <p className={styles.accurate}>
                The more accurate you give your height and weight, the better the system will help you take your measurements.
            </p>

        </>
    )
}
