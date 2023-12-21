/**
 * Now we have functionality where
 * - We can update the febric of shirt model completely
 * - Select different type of collar based on provided configuration
 * - Select different type of accent for that collar such as differnet febric
 *   or select to add different febric inside the collor 
 * - We can select different cuff for the shirt since we do not have model therefore 
 *   i am using same model as soon as we replace that model it would start to work 
 *   but keep in mind that model structure need to be the same perphas we might change all model
 * - Select different febric for that cuff, all changes presit vise versa
 * 
 *  Now we need to have model which is good in quality
 *  In addition to that we If we need different configuration to be added such as
 *  - Button whole different thread
 *  - Button whole cuff only in hand
 *  - You might want to add different button color 
 * 
 *  - In Style we might need to add half sleeves, full sleev etc
 *  - Chest pocket perhaps 
 *  - There could be more configuration
 * 
 *  No matter what the process will be more or less same 
 * 
 * Step Next:
 *  - Need to design how to take screen short of customized shirt and show them in card
 *  - we might have edit option how we can update the current selected configuration 
 *  
 *  
 * **/
import { Button } from 'components/Button';
import Header from 'components/Header/Header';
import { productNavigation } from 'config/product';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAccentGlobal, TCollar, UpdateAccentAction, updateAccent } from 'slices/accentSlice';
import { UpdateModelAction, updateModel } from 'slices/modelSlice';
import { RootState } from 'store';
import { SelectionProcess, SelectionTypes } from '../../types/enums';
import Shirt3DModel from './3DModel/Shirt';
import AccentFebricModel from './Febric/AccentFebricModel';
import Filter from './Febric/Filter';
import FebricDetails from './FebricDetails';
import Accents from './Select/Accents';
import Febrics from './Select/Febrics';
import Styles from './Select/Styles';
import styles from './customize.module.scss';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';



export default function Customize() {
    const router = useRouter();
    const [showFilterModel, setShowFilterModel] = useState(false);
    const [showFebricDetailsModel, setShowFebricDetailsModel] = useState(false);
    const [designJourney, setDesignJourney] = useState<SelectionTypes>('febrics');
    const [showAccentFebricModel, setShowAccentFebricModel] = useState<boolean>(false);
    const [activeAccent, setActiveAccent] = useState<keyof IAccentGlobal>('collar');

    const { collar, febric } = useSelector((state: RootState) => state.model);
    const { cuff } = useSelector((state: RootState) => state.model);
    const { collar: collarAccent } = useSelector((state: RootState) => state.accent);
    const { cuff: cuffAccent } = useSelector((state: RootState) => state.accent);
    const [screenShot, setScreenShot] = useState<string | null>(null);
    const [takeScreenShot, setTakeScreenShot] = useState(false);
    const { model: febricURI } = febric;


    const dispatch = useDispatch();

    // When user in final stage of selection 
    // it will send we will take screen short of the model 
    // will upload to the server
    // receive the response 
    // dispatch to the store because it will contain uploaded CDN link
    // then finally will send to cart URI


    // const CaptureModelScreenShot = () => {
    //     const { gl, scene, camera } = useThree();

    //     const captureScreenshot = () => {
    //         // Get the canvas element from the ref
    //         gl.render(scene, camera);
    //         const screenShot = gl.domElement.toDataURL();

    //         console.log('screenShot', screenShot);
    //     };

    //     return <Html>
    //         <Button variant='primary' type='square' onClick={() => nextStepHandler()}>
    //             <span>Next</span>
    //         </Button>
    //     </Html>

    //     return null;
    // }


    const nextStepHandler = () => {

        // uploadScreenShotToCloud();
        // return;
        setTakeScreenShot(true);
        return;
        if (designJourney === SelectionProcess.accents) {
            // router.push('/cart');
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
                updatedFrom: 'febrics',
                price: 0

            }
            dispatch(updateAccent({ key: 'collar', payload: payloadC }));
        }
    }

    const updateCollarFebriceHandler = (event: React.MouseEvent<HTMLButtonElement>, params: UpdateAccentAction) => {
        event.stopPropagation();
        const { key, payload } = params;
        const { meshName } = activeAccent === 'collar' ? collarAccent : cuffAccent;
        payload.meshName = meshName;
        payload.updatedFrom = 'accents';
        dispatch(updateAccent({ key: activeAccent, payload }));
    }

    const computePrice = useMemo(() => {
        return febric.price + collarAccent.price + cuffAccent.price;
    }, [febric.price, collarAccent.price, cuffAccent.price]);



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
                            setScreenShot={setScreenShot}
                            takeScreenShot={takeScreenShot}
                        />
                    </div>
                    <div className={styles.infomration}>
                        <div className={styles.row}>
                            <div className={styles.name}>
                                custom shirt
                            </div>
                            <div className={styles.price}>
                                ${computePrice}
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
