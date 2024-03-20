'use client';
import { EAccent, EAccentChildrens, EStyles } from 'config/models';
import { ItemInterface, ProductStylesInterface } from 'interface/IProductStyle.interface';
import { Fragment, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { IAccentGlobal, TBase, UpdateAccentActionType, accentProperties, updateAccent, updateAccentType } from 'slices/accentSlice';
import { RowType, updateModel } from 'slices/modelSlice';
import styles from '../styles.module.scss';
import Image from 'next/image';

const baseURL = '/img/button-threads';

const buttonWholeThreadColors = [{
    url: `${baseURL}/thread-black.png`
},
{
    url: `${baseURL}/thread-black.png`
},
{
    url: `${baseURL}/thread-black.png`
},
{
    url: `${baseURL}/thread-black.png`
},
{
    url: `${baseURL}/thread-black.png`
},
{
    url: `${baseURL}/thread-black.png`
},
]


interface IColorPalate {
    onClick: MouseEventHandler<HTMLImageElement>;
}

const ColorPalate = ({onClick}: IColorPalate) => {
    return (
        <div className={styles.colors}>
            <div className={styles.navigation}></div>

            <div className={styles.threads}>
                { }
                {buttonWholeThreadColors.map((val, key) => <div key={key} className={styles.color}>
                    <Image src={val.url} width={57} height={37} alt='color' onClick={onClick}/>
                </div>)}


            </div>
        </div>
    );
};


function Items({ code, id, title, mediaUrl, onClickHanlder, iconClass }: ItemInterface) {
    return (<Fragment>

        <input className={styles.checkbox} type='radio' name={code} id={id} hidden />
        <label className={styles.item} htmlFor={id} onClick={onClickHanlder}>
            {code === EAccentChildrens.All && <ColorPalate onClick={() => {}}/>}
            <span className={`${styles.col} shirt-icon ${iconClass}`}>
                <span className={styles.style__name}>{title}</span>

            </span>
        </label>
    </Fragment>
    )
}

export default function ProductStyles({ label, childrens, code, setShowAccentFebricModel, type, setActiveAccent, collarAccent, cuffAccent }: ProductStylesInterface) {
    const dispatch = useDispatch();

    const dispatchSelectedModelConfig = ({ modelURL, ...rest }: RowType) => {
        dispatch(updateModel({
            payload:
            {
                modelURL,
                ...rest
            },
            key: code as keyof IAccentGlobal
        }));

        if (cuffAccent && code !== EStyles.Collar) {
            const payload = {
                ...cuffAccent,
                febric: `${cuffAccent?.febric}?timestamp=${Date.now()}`
            } as TBase;
            dispatch(updateAccent({ key: code as keyof IAccentGlobal, payload }))
        }

        if (collarAccent && code !== EStyles.Cuff) {
            const payload = { ...collarAccent, febric: `${collarAccent?.febric}?timestamp=${Date.now()}` } as TBase;
            dispatch(updateAccent({ key: code as keyof IAccentGlobal, payload }))
        }
    }

    const dispatchAccentType = ({ key, payload }: UpdateAccentActionType) => {

        // If code === constrasting button then we do not need for 
        // now to process the request in same way
        // We need to open a small model which is show the available thread color

        if (code === EAccent.ButtonWholeStitch) {
            return;
        }


        if (setActiveAccent) {
            setActiveAccent(code);
        }
        if (payload.type === 'default') {

            const { collar, cuff } = accentProperties;

            dispatch(updateAccent({ key, payload: code === EStyles.Cuff ? cuff : collar }));

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
                    code={children.code}
                    id={`styles-children-${code}-${i}`}
                    title={children.label}
                    mediaUrl={children.mediaUrl}

                    onClickHanlder={() => type ===
                        'style' ?
                        dispatchSelectedModelConfig
                            ({
                                ...children,
                                modelURL: `${children.modelURL}?timestamp=${Date.now()}`,
                                id: children.id

                            }) :

                        dispatchAccentType({ key: code as keyof IAccentGlobal, payload: children })
                    }

                />)}
                { }
            </div>
        </div>
    )
}
