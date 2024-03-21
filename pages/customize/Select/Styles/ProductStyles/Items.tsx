import React from "react";
import { ForwardedRef, Fragment, MouseEventHandler, RefObject, forwardRef } from "react";
import styles from '../styles.module.scss';
import { EAccentButtonColor, EAccentChildrens } from "config/models";
import Image from "next/image";
import { ItemInterface } from "interface/IProductStyle.interface";
import { buttonThreadBaseURI } from "config/default";




export interface ThreadColor {
    id: string; // MongoDB document ID
    title: string; // Color name
    febric: string; // Image URL
    price:number;
}

const buttonWholeThreadColors: ThreadColor[] = [
    {
        id: '1',
        title: 'Black',
        febric: `${buttonThreadBaseURI}/thread-black.png`,
        price:0
    },
    {
        id: '2',
        title: 'Blue',
        febric: `${buttonThreadBaseURI}/thread-blue.png`, 
        price:0
    },
    {
        id: '3',
        title: 'Brown',
        febric: `${buttonThreadBaseURI}/thread-brown.png`, 
        price:0
    },
    {
        id: '4',
        title: 'Gray',
        febric: `${buttonThreadBaseURI}/thread-gray.png`, 
        price:0
    },
    {
        id: '5',
        title: 'Green',
        febric: `${buttonThreadBaseURI}/thread-green.png`, 
        price:0
    },
    {
        id: '6',
        title: 'Red',
        febric: `${buttonThreadBaseURI}/thread-red.png`, 
        price:0
    }
];


interface IColorPalate {
    onClick: MouseEventHandler<HTMLImageElement>;
    show: boolean;
    [x: string]: any;
}

export const ColorPalate = React.forwardRef((
    { onClick, show, code }: IColorPalate,
    ref: ForwardedRef<HTMLDivElement>
) => {
    return (
        <div ref={ref} className={`${styles.colors} ${show && styles.showColorPlate}`}>
            <div className={styles.navigation}></div>

            <div className={styles.threads}>
                {buttonWholeThreadColors.map((val, key) => (
                    <div key={key} className={styles.color}>
                        <Image src={val.febric} width={57} height={37} alt='color' onClick={() => onClick({...val, code} as any)} />
                    </div>
                ))}
            </div>
        </div>
    );
});

ColorPalate.displayName = 'ColorPalate';

function Items({onColorClickHandler, showColorPlateOne, name, code, id, title, mediaUrl, onClickHanlder, iconClass }: ItemInterface, ref: ForwardedRef<HTMLInputElement>) {
    return (<Fragment>

        <input className={styles.checkbox} type='radio' name={name} id={id} hidden />
        <label className={styles.item} htmlFor={id} onClick={onClickHanlder}>
            {[EAccentChildrens.All, EAccentButtonColor.All].includes(code as any) && <><ColorPalate code={code} ref={ref} show={showColorPlateOne} onClick={onColorClickHandler} /></>}
            <span className={`${styles.col} shirt-icon ${iconClass}`}>
                <span className={styles.style__name}>{title}</span>

            </span>
        </label>
    </Fragment>
    )
}

export default forwardRef(Items);