'use client';
import { Button } from 'components/Button'
import Input from 'components/Input'
import Select from 'components/Select'
import React from 'react';
import Image from 'next/image';
import styles from './measurement.module.scss';

const ages = [{name: "0-18", value: "0-18"}];
const height = [{name: "5", value: "5"}];
const inches = [{name: "1", value: "1"}];

export default function Measurment() {
    return (
        <div className={styles.measurement__container}>
            <div className={styles.measurement__form}>
                <div className={styles.title}>
                    and now, let{'\''}s measure!
                </div>
                <p className={styles.description}>
                    We are going to create your body measurements profile. All we need is some basic information.
                </p>
                <div className={styles.form__group}>
                <div className={styles.form__row}>
                    <Input label='Full Name' />
                </div>
                <p className={styles.unite}>
                    Change Unite feet/lb or cm/kg
                </p>
                <div className={styles.form__row}>
                        <Select
                        options={height}
                        value=''
                        label='Height/Feet'
                        onChange={() => { }}
                    />
                    <Select
                        options={inches}
                        value=''
                        label='inch'
                        onChange={() => { }}
                    />
                    <Select
                        options={[]}
                        value=''
                        label='weight/lb'
                        onChange={() => { }}
                    />
                    <Input
                        options={ages}
                       
                        label='Age'
                        type='number'
                        onChange={() => { }}
                    />
                </div>
                <p className={styles.accurate}>
                    The more accurate you give your height and weight, the better the system will help you take your measurements.
                </p>
                </div>
                <div className={styles.actions}>
                    <Button variant='primary' type='square'>
                        Next
                    </Button>
                </div>
            </div>
            <div className={styles.video__guide}>
                <Image src='/img/video.png' width={1190} height={670} alt='' />
            </div>
            <div className={styles.time__tape}>
                <div className={styles.col}>
                    <Image src='/icon/time.svg' width={60} height={60} alt='time' />
                    <span className={styles.sub}>Are you in a hurry?</span>
                    <span className={styles.uppercase}>
                        COMPLETE YOUR ORDER
                    </span>
                    <span className={styles.rest}>
                        and take your measurements later
                    </span>
                </div>
                <div className={styles.col}>
                    <Image src='/icon/time.svg' width={60} height={60} alt='time' />
                    <span className={styles.sub}>Are you in a hurry?</span>
                    <span className={styles.uppercase}>
                        COMPLETE YOUR ORDER
                    </span>
                    <span className={styles.rest}>
                        and take your measurements later
                    </span>
                </div>
            </div>
        </div>
    )
}