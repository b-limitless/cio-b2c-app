import React from "react";
import { ForwardedRef, Fragment, MouseEventHandler, RefObject, forwardRef } from "react";
import styles from '../styles.module.scss';
import { EAccentChildrens } from "config/models";
import Image from "next/image";
import { ItemInterface } from "interface/IProductStyle.interface";


const baseURL = '/img/button-threads';

const buttonWholeThreadColors = [{
    url: `${baseURL}/thread-black.png`
},
{
    url: `${baseURL}/thread-blue.png`
},
{
    url: `${baseURL}/thread-brown.png`
},
{
    url: `${baseURL}/thread-gray.png`
},
{
    url: `${baseURL}/thread-green.png`
},
{
    url: `${baseURL}/thread-red.png`
},
]

interface IColorPalate {
    onClick: MouseEventHandler<HTMLImageElement>;
    show:boolean;
    [x:string]:any;
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

ColorPalate.displayName = ''; 
function Items({showColorPlateOne, name, code, id, title, mediaUrl, onClickHanlder, iconClass }: ItemInterface, ref:ForwardedRef<HTMLInputElement>) {
    return (<Fragment>

        <input className={styles.checkbox} type='radio' name={name} id={id} hidden />
        <label className={styles.item} htmlFor={id} onClick={onClickHanlder}>
            {code === EAccentChildrens.All && <><ColorPalate ref = {ref} show={showColorPlateOne} onClick={() => {}}/></> }
            <span className={`${styles.col} shirt-icon ${iconClass}`}>
                <span className={styles.style__name}>{title}</span>

            </span>
        </label>
    </Fragment>
    )
}

export default forwardRef(Items);