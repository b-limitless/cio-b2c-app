'use client';
import { EAccent, EAccentChildrens, EStyles } from 'config/models';
import { ItemInterface, ProductStylesInterface } from 'interface/IProductStyle.interface';
import { Fragment, MouseEventHandler, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IAccentGlobal, TBase, UpdateAccentActionType, accentProperties, updateAccent, updateAccentType } from 'slices/accentSlice';
import { RowType, updateModel } from 'slices/modelSlice';
import styles from '../styles.module.scss';
import Image from 'next/image';
import useOnClickOutside from 'hooks/useOnClickOutSide';
import { useAspect } from '@react-three/drei';
import Items, { ColorPalate } from './Items';


export default function ProductStyles({ label, childrens, code, setShowAccentFebricModel, type, setActiveAccent, collarAccent, cuffAccent }: ProductStylesInterface) {
    const dispatch = useDispatch();
    
    const ref = useRef(null);
    
    const [showColorPlateOne, setShowColorPlateOne] = useState(false);

    useOnClickOutside(ref, () => {
        setShowColorPlateOne(false);
    });

    const dispatchSelectedModelConfig = ({ modelURL, ...rest }: RowType) => {
        dispatch(updateModel({
            payload:
            {
                modelURL,
                ...rest
            },
            key: code as any
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

    const buttonContrastSwitching = ({childCode}: {childCode: EAccentChildrens}) => {
        // Since you have access to differet parts such as all and cuff only 
        // You can access the value for the button whole color and dispatch to the redux store
        // add redux store to manage buttonWholeColor
        // data structure could be like this
        // in this way it will help to understand which user has selected full body or cuff only 
        // you have rest of the details as well which can be brough from the onclick event from the grid
        // {
        //     type: EAccentChildrens,
        //     url: 'mediaurl'
        // }
        if (childCode === EAccentChildrens.All ||
            childCode === EAccentChildrens.CuffOnly
            ) {
            setShowColorPlateOne(true)
            return;
        } 
    }
    const dispatchAccentType = async({ key, payload, childCode }: UpdateAccentActionType) => {

        // If code === constrasting button then we do not need for 
        // now to process the request in same way
        // We need to open a small model which is show the available thread color
        
         if(childCode) buttonContrastSwitching({childCode});

         if(code === EAccent.ButtonWholeStitch) {
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
                    name={code}
                    onClickHanlder={() => type ===
                        'style' ?
                        dispatchSelectedModelConfig
                            ({
                                ...children,
                                modelURL: `${children.modelURL}?timestamp=${Date.now()}`,
                                id: children.id

                            }) :
                        dispatchAccentType({ key: code as keyof IAccentGlobal, payload: children, childCode: children.code })
                    }
                    showColorPlateOne={showColorPlateOne}
                    ref={ref}

                />)}
                { }
            </div>
        </div>
    )
}
