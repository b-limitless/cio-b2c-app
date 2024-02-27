'use client';
import Image from 'next/image';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { IAccentGlobal, TBase, TCollarAccent, UpdateAccentActionType, accentProperties, updateAccent, updateAccentType } from 'slices/accentSlice';
import { RowType, updateModel } from 'slices/modelSlice';
import styles from '../styles.module.scss';
import { ItemInterface, ProductStylesInterface } from 'interface/IProductStyle.interface';


function Items({ name, id, title, mediaUrl, onClickHanlder, iconClass }: ItemInterface) {
    return (<Fragment>
        <input className={styles.checkbox} type='radio' name={name} id={id} hidden />
        <label className={styles.item} htmlFor={id} onClick={onClickHanlder}>
            <span className={`${styles.col} shirt-icon ${iconClass}`}>
                {/* <Image src={mediaUrl} width={60} height={51.93} alt='styles' /> */}
                <span className={styles.style__name}>{title}</span>
            </span>
        </label>
    </Fragment>
    )
}

export default function ProductStyles({ label, childrens, code, setShowAccentFebricModel, type, setActiveAccent, collarAccent, cuffAccent }: ProductStylesInterface) {
    const dispatch = useDispatch();

    const dispatchSelectedModelConfig = ({modelURL, ...rest }: RowType) => {
        // Here we need to check something about the collor check the issue folder about the issue

        console.log('modelURL, ...rest ', modelURL, rest );
         dispatch(updateModel({ payload: 
               { 
                modelURL,
                ...rest 
                 }, 
               key: code as keyof IAccentGlobal }));
    

        if (cuffAccent && code !== 'collar') {
            const payload = { 
                   ...cuffAccent, 
                   febric: `${cuffAccent?.febric}?timestamp=${Date.now()}` } as TBase;
            dispatch(updateAccent({ key: code as keyof IAccentGlobal , payload }))
        }

        if (collarAccent && code !== 'cuff') {
            const payload = { ...collarAccent, febric: `${collarAccent?.febric}?timestamp=${Date.now()}` } as TBase;
            dispatch(updateAccent({ key: code as keyof IAccentGlobal , payload }))
        }
    }

    const dispatchAccentType = ({ key, payload }: UpdateAccentActionType) => {

        if (setActiveAccent) {
            setActiveAccent(code);
        }
        if (payload.type === 'default') {
        
            const { collar, cuff } = accentProperties;

            dispatch(updateAccent({ key, payload: code === 'cuff' ? cuff : collar }));

            return;
        };

        setShowAccentFebricModel(true);
        dispatch(updateAccentType({ key, payload }));
    }

    return (
        <div className={styles.row}>
            <div className={styles.title}>{label}</div>
            <div className={styles.items}>
                {childrens && childrens.map((children: any, i: number) => <Items
                    key={`items-${i}`}
                    iconClass={children.iconClass}
                    name={code}
                    id={`styles-children-${code}-${i}`}
                    title={children.label}
                    mediaUrl={children.mediaUrl}
                    // On Click hand
                    onClickHanlder={() => type ===
                        'style' ?
                        dispatchSelectedModelConfig
                            ({ 
                                ...children,
                                modelURL: `${children.modelURL}?timestamp=${Date.now()}` 
                                
                            }) :

                        dispatchAccentType({ key: code as keyof IAccentGlobal, payload: children })
                    }

                />)}
                { }
            </div>
        </div>
    )
}
