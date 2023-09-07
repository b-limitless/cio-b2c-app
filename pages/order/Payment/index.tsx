import { useState } from 'react';
import FormTemplate from '../template/form';
// paypal.svg, credit-card.svg, green-checked.svg
import Image from 'next/image';
import { OrderCommonInterface } from '../common.interface';
import { PaymentOptions, PaymentOptionsTypes } from '../types';
import CreditCard from './Options/CreditCard';
import Options from './Options/Payment/inde';
import Paypal from './Options/Paypal';
import styles from './payment.module.scss';


export default function Payment({ measurementJourney, setMeasurementJourney, nextStageHandler }: OrderCommonInterface) {
  const [selectedPaymentOpition, setSelectedPaymentOption] = useState<PaymentOptionsTypes>(null)
  const [isNextButtonClicked, setIsNextButtonClicked] = useState<boolean>(false);


  return (
    <>
      {isNextButtonClicked && <div className={styles.back} onClick={() => setIsNextButtonClicked(false)}>
        <Image src='/icon/arrow-left-to-right.svg' width={18} height={12} alt='Back'></Image>
      </div>
      }
      <FormTemplate>

        {isNextButtonClicked && selectedPaymentOpition === PaymentOptions.creditCard && <CreditCard nextStageHandler={nextStageHandler} />}
        {isNextButtonClicked && selectedPaymentOpition === PaymentOptions.paypal && <Paypal />}
        {!isNextButtonClicked && <Options
          setSelectedPaymentOption={setSelectedPaymentOption}
          selectedPaymentOpition={selectedPaymentOpition}
          setIsNextButtonClicked={setIsNextButtonClicked}
        />}
      </FormTemplate>

    </>

  )
}
