import React, { useState } from 'react';
import styles from './shipping.module.scss';
import Input from 'components/Input';
import Select from 'components/Select';
import { Button } from 'components/Button';
import { countries } from 'config/countries';
import FormTemplate from '../template/form';
import { IShippingFrom, OrderCommonInterface } from '../../../types/common.interface';
import CountrySelect from 'components/Select/CountrySelect';

export default function Shipping({ measurementJourney, 
                                   setMeasurementJourney, 
                                   nextStageHandler, 
                                   shipping, 
                                   onMouseLeaveEventHandler, 
                                   onChangeHandler }: IShippingFrom) {
  // This state is needed for the select component 
  const [selectedCountry, setSelectedCountry] = useState<any>({
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  });

  const handleOptionChange = (event: any, value: any) => {
    setSelectedCountry(value);
    // dispatch only code to the redux store
  };

  return (
    <FormTemplate>
      <div className={styles.shipping}>
      <div className={styles.form__row}>
          <CountrySelect
            value={selectedCountry}
            set={handleOptionChange}
            sx={{minHeight: '78.9px'}}
            name='country'
            label='Select country'
          />
        </div>
        <div className={styles.form__row}>
          <Input label='First Name' 
          name='firstName'
          value={shipping.data.firstName}
          onChange={onChangeHandler}
          error={shipping.errors?.firstName}
          helperText={shipping.errors?.firstName}
          onBlur={() => onMouseLeaveEventHandler('firstName', shipping.data.firstName)}
          />
          <Input label='Last Name' />
        </div>
        <div className={styles.form__row}>
          <Input label='Street address, house/apartement/unit*' name='addressLine1'/>
        </div>
        <div className={styles.form__row}>
          <Input label='Address line 2' name='addressLine2'/>
        </div>

        <div className={styles.form__row_col_1_2}>
          <Input label='Country code' />
          <Input label='Phone number' />
        </div>
        <div className={styles.form__row}>
          <Input label='Town/City' />
          <Input label='State' />
          <Input label='Post/Zip' />
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
