import React, { useState } from 'react'
import FormTemplate from '../template/form'
// paypal.svg, credit-card.svg, green-checked.svg
import Image from 'next/image';
import styles from './payment.module.scss';
import { Button } from 'components/Button';

enum PaymentOptions {
  paypal='paypal',
  creditCard='creditCard'
}

type paymentOptions = `${PaymentOptions}` | null;

export default function Payment() {
  const [selectedPaymentOpition, setSelectedPaymentOption] = useState<paymentOptions>(null)

  return (
    <FormTemplate>
      <div className={styles.payment__container}>
        <div className={styles.title}>
          <p className={styles.select}>
            Select payment method
          </p>
        </div>
        <div className={styles.options}>
          <div className={styles.option} onClick={() => setSelectedPaymentOption(PaymentOptions.paypal)}>
            <Image src={'/icon/paypal.svg'} width={24} height={28.31} alt='paypal'></Image>
            <span className={styles.title}>Paypal</span>
            
            {selectedPaymentOpition === PaymentOptions.paypal && <Image src={'/icon/green-checked.svg'} width={24} height={24} alt='paypal'></Image>}

          </div>

          <div className={styles.option} onClick={() => setSelectedPaymentOption(PaymentOptions.creditCard)}>
            <Image src={'/icon/credit-card.svg'} width={24} height={28.31} alt='credit-card'></Image>
            <span className={styles.title}>credit card</span>

            {selectedPaymentOpition === PaymentOptions.creditCard && <Image src={'/icon/green-checked.svg'} width={24} height={24} alt='credit card'></Image>}

           

          </div>
        </div>

        <Button variant='primary' type='square'>
          Next
        </Button>
      </div>
    </FormTemplate>
  )
}
