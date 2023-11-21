'use client';
import React, { Fragment } from 'react';
import styles from '../styles.module.scss';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { MouseEventHandler } from 'react';
import { updateModel } from 'slices/modelSlice';
interface ItemInterface {
    name: string;
    id: string;
    title: string;
    mediaUrl: string;
    onClickHanlder:MouseEventHandler<HTMLLabelElement>;
}
interface ProductStylesInterface {
    label: string;
    childrens: any[];
    code: string;
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
export default function ProductStyles({ label, childrens, code }: ProductStylesInterface) {
    const dispatch = useDispatch();

    const dispatchSelectedModelConfig = ({id, model} : {id: any, model:any}) => {
        dispatch(updateModel({payload: {id, model}, key: 'collar'}));
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
                    onClickHanlder={() => dispatchSelectedModelConfig({id:children.id, model: children.model})}
                    
                />)}
                {}
            </div>
        </div>
    )
}
