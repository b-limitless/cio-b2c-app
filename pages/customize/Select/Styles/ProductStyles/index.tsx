import React from 'react';
import styles from '../styles.module.scss';
import Image from 'next/image';

interface ItemInterface {
    name: string;
    id: string;
    title: string;
    mediaUrl: string;
}

interface ProductStylesInterface {
    label: string;
    childrens: any[];
    code: string;
}

function Items({ name, id, title, mediaUrl }: ItemInterface) {

    return (<>
        <input className={styles.checkbox} type='radio' name={name} id={id} hidden />
        <label className={styles.item} htmlFor={id}>
            <span className={styles.col}>
                <Image src={mediaUrl} width={60} height={51.93} alt='styles' />
                <span className={styles.style__name}>{title}</span>
            </span>
        </label>
    </>

    )
}


export default function ProductStyles({ label, childrens, code }: ProductStylesInterface) {
    return (
        <div className={styles.row}>
            <div className={styles.title}>{label}</div>
            <div className={styles.items}>
                {childrens.map((children, i) => <Items
                    key={`items-${i}`}
                    name={code}
                    id={`styles-children-${code}-${i}`}
                    title={children.title}
                    mediaUrl={children.mediaUrl}
                />)}
                {/* <>
                    <input className={styles.checkbox} type='radio' name='collar' id='style-1' hidden />
                    <label className={styles.item} htmlFor='style-1'>
                        <span className={styles.col}>
                            <Image src='/icon/collars/button-down.svg' width={60} height={51.93} alt='styles' />
                            <span className={styles.style__name}>Button down</span>
                        </span>
                    </label>
                </>

                <>
                    <input className={styles.checkbox} type='radio' name='collar' id='style-2' hidden />
                    <label className={styles.item} htmlFor='style-2'>
                        <span className={styles.col}>
                            <Image src='/icon/collars/button-down.svg' width={60} height={51.93} alt='styles' />
                            <span className={styles.style__name}>Button down</span>
                        </span>
                    </label>
                </> */}

            </div>
        </div>
    )
}
