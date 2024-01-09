import Input from 'components/Input'
import React from 'react'
import styles from '../measurement.module.scss';
import Select from 'components/Select';

const countEleven = new Array(10).fill(0);
const ages = [{ name: "0-18", value: "0-18" }];
const height = [{ name: "5", value: "5" }];
const inches = countEleven.map((item, i) => {
    return { name: i }
})

interface IBaseProductMeasurementForm {
    onChangeHandler: Function;
}
export default function BaseProductMeasurementForm({ onChangeHandler }: IBaseProductMeasurementForm) {

    return (
        <>
            <div className={styles.form__row}>
                <Input label='Full Name'
                    name='fullName'
                    onChange={onChangeHandler}
                />
            </div>
            <p className={styles.unite}>
                Change Unite feet/lb or cm/kg
            </p>
            <div className={styles.form__row}>
                <Select
                    options={height}
                    name='height'
                    value=''
                    label='Height/Feet'
                    onChange={onChangeHandler}
                />
                <Select
                    options={inches}
                    value=''
                    label='inch'
                    onChange={() => { }}
                />

                <Input
                    type='number'
                    value=''
                    label='Weight in KG'

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
                    onChange={() => { }}
                />
            </div>
            <p className={styles.accurate}>
                The more accurate you give your height and weight, the better the system will help you take your measurements.
            </p>

        </>
    )
}
