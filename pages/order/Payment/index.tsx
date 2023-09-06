import React, { useState } from 'react'
import FormTemplate from '../template/form'
// paypal.svg, credit-card.svg, green-checked.svg
import Image from 'next/image';
import styles from './payment.module.scss';
import { Button } from 'components/Button';
import CreditCard from './Options/CreditCard';
import Paypal from './Options/Paypal';
import { setEngine } from 'crypto';
import { PaymentOptions, PaymentOptionsTypes } from '../types';
import Options from './Options/Payment/inde';

// enum PaymentOptions {
//   paypal = 'paypal',
//   creditCard = 'creditCard'
// }

// type paymentOptions = `${PaymentOptions}` | null;

export default function Payment() {
  const [selectedPaymentOpition, setSelectedPaymentOption] = useState<PaymentOptionsTypes>(null)
  const [isNextButtonClicked, setIsNextButtonClicked] = useState<boolean>(false);


  return (
    <FormTemplate>
      {isNextButtonClicked && selectedPaymentOpition === PaymentOptions.creditCard && <CreditCard/>}
      {isNextButtonClicked && selectedPaymentOpition === PaymentOptions.paypal && <Paypal/>}
      {!isNextButtonClicked && <Options
        setSelectedPaymentOption={setSelectedPaymentOption}
        selectedPaymentOpition={selectedPaymentOpition}
        setIsNextButtonClicked={setIsNextButtonClicked}
      />}
    </FormTemplate>
  )
}
