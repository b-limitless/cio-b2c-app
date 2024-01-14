import React, { useState } from 'react';
import styles from './shipping.module.scss';
import Input from 'components/Input';
import Select from 'components/Select';
import { Button } from 'components/Button';
import { countries } from 'config/countries';
import FormTemplate from '../template/form';
import { OrderCommonInterface } from '../../../types/common.interface';
import CountrySelect from 'components/Select/CountrySelect';

export default function Shipping({ measurementJourney, setMeasurementJourney, nextStageHandler }: OrderCommonInterface) {
  const [selectedCountry, setSelectedCountry] = useState<any>({
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  })

  const handleOptionChange = (event: any, value: any) => {
    console.log('value', value)
    setSelectedCountry(value);
    // You can also store the selected option in local storage or any other storage mechanism
    // localStorage.setItem('selectedOption', JSON.stringify(value));
  };

  return (
    <FormTemplate>
      <div className={styles.shipping}>
        <div className={styles.form__row}>
          <Input label='First Name' />
          <Input label='Last Name' />
        </div>
        <div className={styles.form__row}>
          <Input label='Street address, house/apartement/unit*' />
        </div>

        <div className={styles.form__row_col_1_2}>
          <Input label='Country code' />
          <Input label='Phone number' />
        </div>
        <div className={styles.form__row}>
          <Input label='Town/City' />
          <Input label='Town/City' />
          <Input label='Post/Zip' />
        </div>
        <div className={styles.form__row}>
          <CountrySelect
            value={selectedCountry}
            set={handleOptionChange}
          />
          {/* <Select
            options={countries}
            value={''}
            label={'Country'}
            onChange={() => { }}
            id='1'
          /> */}
        </div>
        <div className={styles.form__row}>
          <Input label='Email address' type='email' />

        </div>
        <div className={styles.form__row}>
          <Button variant='primary' type='square' onClick={() => nextStageHandler()}>
            Continue to payment
          </Button>
        </div>
      </div>
    </FormTemplate>


  )
}
