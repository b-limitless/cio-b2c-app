'use client';
import React, { Fragment } from 'react';
import styles from '../styles.module.scss';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { MouseEventHandler } from 'react';
import { updateModel } from 'slices/modelSlice';
import { IAccents } from '../../Accents';
import { IAccentGlobal, UpdateAccentActionType, updateAccent, updateAccentType } from 'slices/accentSlice';
import { accentProperties } from 'slices/accentSlice';

interface ItemInterface {
    name: string;
    id: string;
    title: string;
    mediaUrl: string;
    onClickHanlder: MouseEventHandler<HTMLLabelElement>;
}
type TOnClickEvent = 'accent' | 'style' | 'febric';

interface ProductStylesInterface extends IAccents {
    label: string;
    childrens: any[];
    code: string;
    type: TOnClickEvent
}


function Items({ name, id, title, mediaUrl, onClickHanlder }: ItemInterface) {
    return (<Fragment>
        <input className={styles.checkbox} type='radio' name={name} id={id} hidden />
        <label className={styles.item} htmlFor={id} onClick={onClickHanlder}>
            <span className={styles.col}>
                <Image src={mediaUrl} width={60} height={51.93} alt='styles' />
                <span className={styles.style__name}>{title}</span>
            </span>
        </label>
    </Fragment>
    )
}

export default function ProductStyles({ label, childrens, code, setShowAccentFebricModel, type }: ProductStylesInterface) {
    const dispatch = useDispatch();

    const getKeyBasedOnEvent = (): keyof IAccentGlobal => {
        return code.substring(0, code.length - 1) as keyof IAccentGlobal;
    }

    const dispatchSelectedModelConfig = ({ id, model }: { id: any, model: any }) => {
        dispatch(updateModel({ payload: { id, model, price: 0 }, key: getKeyBasedOnEvent() }));
    }

    const dispatchAccentType = ({ key, payload }: UpdateAccentActionType) => {
        if (payload.type === 'default') {
            // need to dispatch default value 
            // Which was initially 

            const { collar } = accentProperties;
            // console.log("dispatching default collar", collar)
            // dispatch(updateAccent({key, payload: collar}));
            dispatch(updateAccent({ key, payload: collar }));

            return;
        };

        setShowAccentFebricModel(true);
        dispatch(updateAccentType({ key, payload }));
    }


    return (
        <div className={styles.row}>
            <div className={styles.title}>{label}</div>
            <div className={styles.items}>
                {childrens && childrens.map((children, i) => <Items
                    key={`items-${i}`}
                    name={code}
                    id={`styles-children-${code}-${i}`}
                    title={children.label}
                    mediaUrl={children.mediaUrl}
                    // On Click hand
                    onClickHanlder={() => type ===
                        'style' ?
                        dispatchSelectedModelConfig
                            ({ id: children.id, model: `${children.model}?timestamp=${Date.now()}` }) :

                        dispatchAccentType({ key: getKeyBasedOnEvent(), payload: children })
                    }

                />)}
                { }
            </div>
        </div>
    )
}
