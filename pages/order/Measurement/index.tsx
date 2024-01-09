'use client';
import { Button } from 'components/Button'
import Input from 'components/Input'
import Select from 'components/Select'
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './measurement.module.scss';
import { IMeasurementForm, OrderCommonInterface } from '../../../types/common.interface';
import { nextStage } from 'functions/nextStage';
import ProductShirt from './product/shirt';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { IShirtMeasurement } from 'interface/IShirtMeasurement';
import BaseProductMeasurementForm from './product/base';
const ages = [{ name: "0-18", value: "0-18" }];
const height = [{ name: "5", value: "5" }];

const countEleven = new Array(10).fill(0);

const inches = countEleven.map((item, i) => {
    return { name: i }
})


export default function Measurement({ measurementJourney, setMeasurementJourney, nextStageHandler, onChangeHandler }: IMeasurementForm) {
    const modelType = useSelector((state:RootState) => state.modelType);

    const {data, errors} = useSelector((state:RootState) => state.measurment);

    const baseMeasurementForm = useMemo(() => {
        const {fullName, height, age, weight} = data;

        return {fullName, height, age, weight};
    }, [data]);

    const shirtMeasurementForm = useMemo(() => {
        const {fullName, height, age, weight, ...rest} = data;

        return {...rest};
    }, [data]);
    
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
                    <BaseProductMeasurementForm
                      onChangeHandler={onChangeHandler ? onChangeHandler : () => {}}
                      formData={baseMeasurementForm}
                      errors={errors}
                    />
                    <ProductShirt 
                        measurement={data}
                        onChange={() => {}}
                        errors={errors}
                        
                    />
                </div>

                <div className={styles.actions}>
                    <Button variant='primary' type='square' onClick={() => nextStageHandler()}>
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
