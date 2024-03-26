import React from 'react'
import FormTemplate from '../template/form';
import Image from 'next/image';
import { Button } from 'components/Button';
import styles from './completed.module.scss';
import { OrderCommonInterface } from 'types/common.interface';
import Link from 'next/link';

export default function OrderCompleted({ measurementJourney, setMeasurementJourney, nextStageHandler }: OrderCommonInterface) {
    return (
        <FormTemplate>
            <div className={styles.order__completed}>
                <div className={styles.group}>
                    <Image src='/icon/right-green.svg' width={100} height={100} alt='success'></Image>

                    <p className={styles.your__order}>
                        Your order is completed
                    </p>
                    <p className={styles.confirmation}>
                        You will be receiving confirmation email
                    </p>

                </div>

                <Link href='/'>
                    <Button variant='primary' type='square'>
                        explore more
                    </Button>
                </Link>



            </div>
        </FormTemplate>
    )
}
