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
import { Canvas, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { dataURLtoBlob } from 'functions/dataURLtoBlob';
import { APIS } from 'config/apis';
import axios from 'axios';
import { ICaptureModelScreenShot } from './index.interface';
import { addToCart } from 'slices/cartSlice';



const CaptureModelScreenShot = ({ dispatch, takeScreenShot, setTakeScreenShot, cartData, setSnapShotUploadState }: ICaptureModelScreenShot) => {
    const { gl, scene, camera } = useThree();
    useEffect(() => {
        const runTakeScreenShot = async () => {
            setSnapShotUploadState('uploading');
            gl.render(scene, camera);
            const screenShot = gl.domElement.toDataURL();

            const blob = dataURLtoBlob(screenShot);

            if (!blob) return;

            const file = new File([blob], 'shot.png', { type: 'image/png' })

            const formData = new FormData();

            formData.append('image', file);

            try {
                const response = await axios.post(APIS.product.upload, formData);

                const { data: { originalImageUrl, thumbnailImageUrl } } = response || {};

                if (originalImageUrl) {
                    const screenCDNURIs = { originalImageUrl, thumbnailImageUrl };
                    const data = { ...screenCDNURIs, ...cartData };
                    dispatch(addToCart(data as any));
                    setSnapShotUploadState('uploaded');

                }

                if (!originalImageUrl) {
                }
            } catch (err: any) {
                console.error(err);
                setSnapShotUploadState(err);
            }
            setTakeScreenShot(false);
            
        }
        if (takeScreenShot) runTakeScreenShot();
    }, [takeScreenShot, camera, gl, scene, setTakeScreenShot, cartData, dispatch, setSnapShotUploadState])




    return null;
}

export type TSnapShotUploadingStates = 'uploaded' | 'uploading' | 'error' | 'ideal';

export default function Customize() {
    const router = useRouter();
    const [showFilterModel, setShowFilterModel] = useState(false);
    const [showFebricDetailsModel, setShowFebricDetailsModel] = useState(false);
    const [designJourney, setDesignJourney] = useState<SelectionTypes>('febrics');
    const [showAccentFebricModel, setShowAccentFebricModel] = useState<boolean>(false);
    const [activeAccent, setActiveAccent] = useState<keyof IAccentGlobal>('collar');

    const { model } = useSelector((state: RootState) => state);
    const { collar, febric, cuff } = model;
    const { accent } = useSelector((state: RootState) => state);
    const { modelType: { modelType } } = useSelector((state: RootState) => state);

    const { collar: collarAccent } = accent;
    const { cuff: cuffAccent } = accent;
    const [screenShot, setScreenShot] = useState<string | null>(null);
    const [takeScreenShot, setTakeScreenShot] = useState<boolean>(false);
   
    const [snapShotUploadState, setSnapShotUploadState] = useState<TSnapShotUploadingStates>('ideal');
    const { model: febricURI } = febric;
    const dispatch = useDispatch();


    
    const nextStepHandler = () => {
        if (designJourney === SelectionProcess.accents) {
            setTakeScreenShot(true);
            return;
        }
        // First get the index of selected step 
        const findIndex = Object.keys(SelectionProcess).indexOf(designJourney);
        // Add one to that index 
        const getNextValue = Object.values(SelectionProcess)[findIndex + 1];
        setDesignJourney(getNextValue);
    }





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


    useEffect(() => {
        if (showFilterModel) {
            document.body.style.overflow = 'hidden';
            // document.body.style.display='none';
        }

        if (!showFilterModel) {
            document.body.style.overflow = 'auto';
        }

    }, [showFilterModel]);

    // If media is uploaded and then we have response and dispatchd to store 
    // run the functio n
    useEffect(() => {
        if(snapShotUploadState === 'uploaded') {
            router.push('/cart');
        }
    }, [snapShotUploadState, router]);

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
                        <Canvas>
                            <Shirt3DModel
                                collar={collar.model}
                                cuff={cuff}
                                febricURI={febricURI}
                                collarAccent={collarAccent}
                                cuffAccent={cuffAccent}
                                takeScreenShot={takeScreenShot}
                            />


                            <CaptureModelScreenShot
                                dispatch={dispatch}
                                takeScreenShot={takeScreenShot}
                                setTakeScreenShot={setTakeScreenShot}
                                setSnapShotUploadState={setSnapShotUploadState}
                                cartData={
                                    {
                                        model,
                                        accent,
                                        modelType,
                                        subTotal: 0,
                                        qty: 1,
                                        discount: 0,
                                        availability: '',
                                        id: 1,

                                    }
                                } />

                        </Canvas>

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
                            <Button variant='primary' type='square' onClick={() => snapShotUploadState === 'uploading' ? null : nextStepHandler()}>
                                <span>{snapShotUploadState === 'uploading' ? 'Please wait...' : 'Next'}</span>
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
