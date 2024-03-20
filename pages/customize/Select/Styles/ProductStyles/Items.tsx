import React from "react";
import { ForwardedRef, Fragment, MouseEventHandler, RefObject, forwardRef } from "react";
import styles from '../styles.module.scss';
import { EAccentChildrens } from "config/models";
import Image from "next/image";
import { ItemInterface } from "interface/IProductStyle.interface";


const baseURL = '/img/button-threads';

interface ThreadColor {
    id: string; // MongoDB document ID
    title: string; // Color name
    url: string; // Image URL
}

const buttonWholeThreadColors: ThreadColor[] = [
    {
        id: '1',
        title: 'Black',
        url: `${baseURL}/thread-black.png`
    },
    {
        id: '2',
        title: 'Blue',
        url: `${baseURL}/thread-blue.png`
    },
    {
        id: '3',
        title: 'Brown',
        url: `${baseURL}/thread-brown.png`
    },
    {
        id: '4',
        title: 'Gray',
        url: `${baseURL}/thread-gray.png`
    },
    {
        id: '5',
        title: 'Green',
        url: `${baseURL}/thread-green.png`
    },
    {
        id: '6',
        title: 'Red',
        url: `${baseURL}/thread-red.png`
    }
];


interface IColorPalate {
    onClick: MouseEventHandler<HTMLImageElement>;
    show: boolean;
    [x: string]: any;
}

export const ColorPalate = React.forwardRef((
    { onClick, show }: IColorPalate,
    ref: ForwardedRef<HTMLDivElement>
) => {
    return (
        <div ref={ref} className={`${styles.colors} ${show && styles.showColorPlate}`}>
            <div className={styles.navigation}></div>

            <div className={styles.threads}>
                {buttonWholeThreadColors.map((val, key) => (
                    <div key={key} className={styles.color}>
                        <Image src={val.url} width={57} height={37} alt='color' onClick={onClick} />
                    </div>
                ))}
            </div>
        </div>
    );
});

ColorPalate.displayName = 'ColorPalate';

function Items({ showColorPlateOne, name, code, id, title, mediaUrl, onClickHanlder, iconClass }: ItemInterface, ref: ForwardedRef<HTMLInputElement>) {
    return (<Fragment>

        <input className={styles.checkbox} type='radio' name={name} id={id} hidden />
        <label className={styles.item} htmlFor={id} onClick={onClickHanlder}>
            {code === EAccentChildrens.All && <><ColorPalate ref={ref} show={showColorPlateOne} onClick={() => { }} /></>}
            <span className={`${styles.col} shirt-icon ${iconClass}`}>
                <span className={styles.style__name}>{title}</span>

            </span>
        </label>
    </Fragment>
    )
}

export default forwardRef(Items);