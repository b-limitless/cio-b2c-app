import { Button } from 'components/Button';
import Header from 'components/Header/Header';
import { productNavigation } from 'config/product';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateModelAction, updateModel } from 'slices/modelSlice';
import { RootState } from 'store';
import { SelectionProcess, SelectionTypes } from '../../types/enums';
import Shirt3DModel from './3DModel/Shirt';
import Filter from './Febric/Filter';
import AccentFebricModel from './Febric/AccentFebricModel';
import FebricDetails from './FebricDetails';
import Accents from './Select/Accents';
import Febrics from './Select/Febrics';
import Styles from './Select/Styles';
import styles from './customize.module.scss';
import { IAccentGlobal, TCollar, TCollarAccent, UpdateAccentAction, updateAccent } from 'slices/accentSlice';
import { defaultFebric } from 'config/default';



//  State that need for the model customization
// If this is shirt

// Style


const model = {
    collar: {
        id: 12,
        model: 'URL for the model to load from CDN'
    },
    scuff: {
        id: 13,
        model: 'URL for the model to load'
    },
    sleeves: {
        id: 13,
        model: 'URL for the model to load'
    },
    checkpocket: {
        id: 13,
        model: 'URL for the model to load'
    }
}



type ContrastedCollars = 'By default' | 'All' | 'Inner febric';
type ContrastedCuffs = 'By default' | 'All' | 'Inner febric';
type ConstrastedStitch = 'By default' | 'All' | 'Only cuffs'

const accent = {
    collar: {
        selected: 'By Default',
        febric: {
            id: null,
            url: 'http://'
        }
    },
    cuff: {
        selected: 'By Default',
        febric: {
            id: null,
            url: 'http://'
        }
    },
}

const orderInitialState = {
    shippingAddress: {},
    billingAddress: {},
    orderTotal: 0,
}



export default function Customize() {
    const router = useRouter();
    const [showFilterModel, setShowFilterModel] = useState(false);
    const [showFebricDetailsModel, setShowFebricDetailsModel] = useState(false);
    const [designJourney, setDesignJourney] = useState<SelectionTypes>('febrics');
    const [showAccentFebricModel, setShowAccentFebricModel] = useState<boolean>(false);
    const [activeAccent, setActiveAccent] = useState<keyof IAccentGlobal>('collar');

    const { collar, febric } = useSelector((state: RootState) => state.model);
    const{cuff} = useSelector((state: RootState) => state.model);
    const { collar: collarAccent } = useSelector((state: RootState) => state.accent);
    const { cuff: cuffAccent } = useSelector((state: RootState) => state.accent);
    const { model: febricURI } = febric;

    const dispatch = useDispatch();

    // Hello
    const nextStepHandler = () => {

        if (designJourney === SelectionProcess.accents) {
            router.push('/order');
            return;
        }
        // First get the index of selected step 
        const findIndex = Object.keys(SelectionProcess).indexOf(designJourney);
        // Add one to that index 
        const getNextValue = Object.values(SelectionProcess)[findIndex + 1];
        setDesignJourney(getNextValue);
    }

    useEffect(() => {
        if (showFilterModel) {
            document.body.style.overflow = 'hidden';
            // document.body.style.display='none';
        }

        if (!showFilterModel) {
            document.body.style.overflow = 'auto';
        }

    }, [showFilterModel]);

    const updateFebricHandler = (event: React.MouseEvent<HTMLButtonElement>, params: UpdateModelAction) => {
        event.stopPropagation();
        const { key, payload } = params;
        // You need to check the collor febric as well 
        // If the febric for the collar is default then do not need to update that state as well
        // If not then that means user has already updated and keep the user selection on the model


        dispatch(updateModel({ key, payload }));

        if (collarAccent.updatedFrom === 'febrics') {

            // Update the collor with different febric
            const payloadC: TCollar = {
                id: 12,
                meshName: [], //'because it can be combining all or inner',
                febric: payload.model,
                type: 'default',
                updatedFrom: 'febrics'
            }
            dispatch(updateAccent({ key: 'collar', payload: payloadC }));
        }
    }

    const updateCollarFebriceHandler = (event: React.MouseEvent<HTMLButtonElement>, params: UpdateAccentAction) => {
        event.stopPropagation();
        const { key, payload } = params;
        const { meshName } = activeAccent === 'collar' ?  collarAccent : cuffAccent;
        payload.meshName = meshName;
        payload.updatedFrom = 'accents';
        dispatch(updateAccent({ key: activeAccent, payload }));
    }


    return (
        <>
            {showFebricDetailsModel && <FebricDetails setShowFebricDetailsModel={setShowFebricDetailsModel} showFebricDetailsModel={showFebricDetailsModel} />
            }

            <Filter setShowFilterModel={setShowFilterModel} showFilterModel={showFilterModel} />
            <AccentFebricModel
                setShowFilterModel={setShowAccentFebricModel}
                showFilterModel={showAccentFebricModel}
                onClickHandler={updateCollarFebriceHandler}
            />
            <div className={styles.container}>
                
                <Header navigations={productNavigation} designJourney={designJourney} setDesignJourney={setDesignJourney} showNavigation />
                <main className={styles.main__content}>

                    <div className={styles.filter}>
                        <div className={styles.title}>Select {designJourney}</div>


                        {designJourney === 'febrics' &&
                            <Febrics
                                setShowFilterModel={setShowFilterModel}
                                setShowFebricDetailsModel={setShowFebricDetailsModel}
                                onClickHandler={updateFebricHandler}

                            />}

                        {designJourney === 'styles' &&
                            <Styles
                            collarAccent={collarAccent}
                            cuffAccent={cuffAccent}

                            />}

                        {designJourney === 'accents' && <Accents
                            setShowAccentFebricModel={setShowAccentFebricModel}
                            showAccentFebricModel={showAccentFebricModel}
                            setActiveAccent={setActiveAccent}
                        />}

                    </div>
                    <div className={styles.model}>

                        {/* <Image src='/img/shirt.png' width={503} height={600} alt='model' /> */}

                        <Shirt3DModel
                            collar={collar.model}
                            cuff={cuff}
                            febricURI={febricURI}
                            collarAccent={collarAccent}
                            cuffAccent={cuffAccent}
                        />
                    </div>
                    <div className={styles.infomration}>
                        <div className={styles.row}>
                            <div className={styles.name}>
                                custom shirt
                            </div>
                            <div className={styles.price}>
                                $89
                            </div>
                            <div className={styles.feature}>
                                ESSENTIAL
                            </div>
                            <div className={styles.type}>
                                Cotton
                            </div>
                            <div className={styles.ref}>
                                ref: Mayfield
                            </div>
                            <div className={styles.detail__action}>
                                FebricDetails
                            </div>
                        </div>
                        <div className={styles.row}>
                            <Button variant='primary' type='square' onClick={() => nextStepHandler()}>
                                <span>Next</span>
                            </Button>
                            <div className={styles.receives__when}>
                                RECEIVE IN 3 WEEKS
                            </div>
                            <div className={styles.icons}>
                                <Image src='/icon/heart.svg' width={24} height={20} alt='heart' />
                                <Image src='/icon/share.svg' width={24} height={20} alt='share' />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>

    )
}
