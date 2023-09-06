import React from 'react';
import styles from './shipping.module.scss';
import Input from 'components/Input';
import Select from 'components/Select';
import { Button } from 'components/Button';
import { countries } from 'config/countries';
import FormTemplate from '../template/form';

export default function Shipping() {
  return (
    <FormTemplate>
      <div className={styles.shipping}>
        <div className={styles.form__row}>
          <Input label='First Name' />
          <Input label='Last Name' />
        </div>
        <div className={styles.form__row}>
          <Input label='Street address' />
        </div>
        <div className={styles.form__row}>
          <Input label='Town/City' />
          <Input label='Town/City' />
          <Input label='Post/Zip' />
        </div>
        <div className={styles.form__row}>
          <Select
            options={countries}
            value={''}
            label={'Country'}
            onChange={() => { }}
            id='1'
          />
        </div>
        <div className={styles.form__row}>
          <Input label='Email address' type='email' />
        </div>
        <div className={styles.form__row}>
          <Button variant='primary' type='square'>
            Continue to payment
          </Button>
        </div>
      </div>
    </FormTemplate>


  )
}
