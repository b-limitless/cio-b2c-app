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
}
export default function BaseProductMeasurementForm({ onChangeHandler, formData, errors }: IBaseProductMeasurementForm) {

    return (
        <>
            <div className={styles.form__row}>
                <Input label='Full Name'
                    name='fullName'
                    onChange={(e:any) => onChangeHandler(e)}
                    value={formData?.fullName ?? ''}
                    error={errors?.fullName}
                />
            </div>
            <p className={styles.unite}>
                Change Unite feet/lb or cm/kg
            </p>
            <div className={styles.form__row}>
                <Select
                    options={height}
                    name='height'
                    value={formData?.height?.value ?? 0}
                    label='Height/Feet'
                    onChange={onChangeHandler}
                    error={errors?.height?.value}
                    
                />
                <Select
                    options={inches}
                    value=''
                    label='inch'
                    onChange={onChangeHandler}
                    error={errors?.height?.value}
                />

                <Input
                    type='number'
                    value=''
                    label='Weight in KG'
                    onChange={onChangeHandler}
                    error={errors?.weight}

                />

                {/* <Select
                options={[]}
                value=''
                label='Weight in KG'
                onChange={() => { }}

                /> */}
                <Input
                    options={ages}
                    name='age'
                    label='Age'
                    type='number'
                    onChange={onChangeHandler}
                />
            </div>
            <p className={styles.accurate}>
                The more accurate you give your height and weight, the better the system will help you take your measurements.
            </p>

        </>
    )
}
