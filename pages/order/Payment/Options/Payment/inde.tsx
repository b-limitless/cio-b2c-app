import React from 'react';
import styles from './payment.module.scss';
import Image from 'next/image';
import { PaymentOptions, PaymentOptionsTypes } from 'types';
import { Button } from 'components/Button';


interface PaymentOptionsInterface {
    setSelectedPaymentOption: Function;
    selectedPaymentOpition: PaymentOptionsTypes;
    setMeasurementJourney: Function;
}

export default function Options({ setSelectedPaymentOption, selectedPaymentOpition, setMeasurementJourney }: PaymentOptionsInterface) {
    return (
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

                <div style={{pointerEvents: 'none', opacity:0.6}} className={styles.option} onClick={() => setSelectedPaymentOption(PaymentOptions.creditCard)}>
                    <Image src={'/icon/credit-card.svg'} width={24} height={28.31} alt='credit-card'></Image>
                    <span className={styles.title}>credit card</span>

                    {selectedPaymentOpition === PaymentOptions.creditCard && <Image src={'/icon/green-checked.svg'} width={24} height={24} alt='credit card'></Image>}
                </div>
            </div>

            <Button variant='primary' type='square' onClick={() => setMeasurementJourney()}>
                Next
            </Button>
        </div>
    )
}
