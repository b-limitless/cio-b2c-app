import { useState } from 'react';
import FormTemplate from '../template/form';
// paypal.svg, credit-card.svg, green-checked.svg
import Image from 'next/image';
import { OrderCommonInterface } from '../../../types/common.interface';
import { PaymentOptions, PaymentOptionsTypes } from '../../../types';
import CreditCard from './Options/CreditCard';
import Options from './Options/Payment/inde';
import Paypal from './Options/Paypal';
import styles from './payment.module.scss';
import { FormHelperText } from '@mui/material';


export default function Payment({nextStageHandler, error}: OrderCommonInterface) {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOptionsTypes>(null)

  return (
    <>

      <FormTemplate>
          
         <Options
          error={error}
          nextStageHandler={nextStageHandler}
        />
      </FormTemplate>

    </>

  )
}
