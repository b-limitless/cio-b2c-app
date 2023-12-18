'use client';
import Image from 'next/image';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { IAccentGlobal, TCollar, UpdateAccentActionType, accentProperties, updateAccent, updateAccentType } from 'slices/accentSlice';
import { updateModel } from 'slices/modelSlice';
import styles from '../styles.module.scss';
import { ItemInterface } from './product-style.interface';


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

export default function ProductStyles({ label, childrens, code, setShowAccentFebricModel, type, setActiveAccent }: ProductStylesInterface) {
    const dispatch = useDispatch();

    // const getKeyBasedOnEvent = (): keyof IAccentGlobal => {
    //     return code.substring(0, code.length - 1) as keyof IAccentGlobal;
    // }

    const dispatchSelectedModelConfig = ({ id, model }: { id: any, model: any }) => {
        // Dispatching the model update
        dispatch(updateModel({ payload: { id, model, price: 0 }, key: code as keyof IAccentGlobal }));
        // Need to dispatch the already selected accent so that we can apply

        const payload = {
            id: 1,
            febric: '/img/febric-5.jpg',
            meshName: [
                'Collar_Top',
                'Collor_Button_Holder',
                'Collor_Inner',
                'Node_5'
            ],
            updatedFrom: 'accents',
            type: 'default'
        } as TCollar;
        dispatch(updateAccentType({ key: 'collar', payload }))
    }

    const dispatchAccentType = ({ key, payload }: UpdateAccentActionType) => {

        if (setActiveAccent) {
            setActiveAccent(code);
        }
        if (payload.type === 'default') {
            // need to dispatch default value 
            // Which was initially 

            const { collar, cuff } = accentProperties;

            dispatch(updateAccent({ key, payload: code === 'cuff' ? cuff : collar }));

            return;
        };

        setShowAccentFebricModel(true);
        dispatch(updateAccentType({ key, payload }));
    }

    // If type is style then simply need to get the febric which is
    // Store inside the redux store and then dispatch 


    return (
        <div className={styles.row}>
            <div className={styles.title}>{label}</div>
            <div className={styles.items}>
                {childrens && childrens.map((children: any, i: number) => <Items
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

                        dispatchAccentType({ key: code as keyof IAccentGlobal, payload: children })
                    }

                />)}
                { }
            </div>
        </div>
    )
}
