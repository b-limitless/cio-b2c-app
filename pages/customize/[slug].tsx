
'use client';
// For testing purpose only
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


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
    // You need to check the collor febric as well 
    // If the febric for the collar is default then do not need to update that state as well
    // If not then that means user has already updated and keep the user selection on the model
 * **/
import { Canvas, useThree } from '@react-three/fiber';
import axios from 'axios';
import { Button } from 'components/Button';
import Header from 'components/Header/Header';
import { APIS } from 'config/apis';
import { defaultCollarModel, defaultFebric } from 'config/default';
import { productNavigation } from 'config/product';
import { dataURLtoBlob } from 'functions/dataURLtoBlob';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAccentGlobal, UpdateAccentAction, updateAccent } from 'slices/accentSlice';
import { addToCart } from 'slices/cartSlice';
import { RowType, UpdateModelAction, updateModel } from 'slices/modelSlice';
import { RootState } from 'store';
import { SelectionProcess, SelectionTypes } from '../../types/enums';
import Shirt3DModel from 'pages/customize/3DModel/Shirt';
import AccentFebricModel from 'pages/customize/Febric/AccentFebricModel';
import Filter from './Febric/Filter';
import FebricDetails from './FebricDetails';
import Accents from './Select/Accents';
import Febrics from './Select/Febrics';
import Styles from './Select/Styles';
import styles from './customize.module.scss';
import { ICaptureModelScreenShot, TSnapShotUploadingStates } from 'interface/ICart.interface';
import { updateFebric } from 'slices/febricSlice';
import { TFebric } from 'slices/febricSlice';
const https = require('https');


const agent = new https.Agent({
    rejectUnauthorized: false,
    requestCert: false,
    agent: false,
 });


const CaptureModelScreenShot = ({ dispatch, takeScreenShot, setTakeScreenShot, cartData }: ICaptureModelScreenShot) => {

    const { gl, scene, camera } = useThree();
    useEffect(() => {
        const runTakeScreenShot = async () => {

            gl.render(scene, camera);
            const screenShot = gl.domElement.toDataURL(); 

            const boblFile = dataURLtoBlob(screenShot);

            if (!boblFile) return;

            const snapShotFile = new File([boblFile], 'shot.png', { type: 'image/png' })

            const formData = new FormData();

            formData.append('image', snapShotFile);

            try {
                setTakeScreenShot('uploading');
                const response = await axios.post(APIS.product.upload, formData, {httpAgent: agent});
                const { data: { originalImageUrl, thumbnailImageUrl } } = response || {};

                if (originalImageUrl) {
                    const screenCDNURIs = { originalImageUrl, thumbnailImageUrl };
                    const data = { ...screenCDNURIs, ...cartData };
                    dispatch(addToCart(data as any));
                    setTakeScreenShot('uploaded');

                }
                if (!originalImageUrl) {
                }

            } catch (err: any) {
                console.error(err);
            }


        }
        if (takeScreenShot === 'upload') runTakeScreenShot();
    }, [takeScreenShot, camera, gl, scene, setTakeScreenShot, cartData, dispatch])

    return null;
}

export default function Customize() {
    const router = useRouter();
    const [showFilterModel, setShowFilterModel] = useState(false);
    const [showFebricDetailsModel, setShowFebricDetailsModel] = useState(false);
    const [designJourney, setDesignJourney] = useState<SelectionTypes>('febrics');
    const [showAccentFebricModel, setShowAccentFebricModel] = useState<boolean>(false);
    const [activeAccent, setActiveAccent] = useState<keyof IAccentGlobal>('collar');

    const model = useSelector((state: RootState) => state.model);
    const { collar, cuff } = model;
    const febric =  useSelector((state:RootState) => state.febric); 
    const accent = useSelector((state: RootState) => state.accent);
    const { modelType } = useSelector((state: RootState) => state.modelType);
    const {index} = useSelector((state: RootState) => state.cartIndexToupdate);

    const { collar: collarAccent } = accent;
    const { cuff: cuffAccent } = accent;
    const [takeScreenShot, setTakeScreenShot] = useState<TSnapShotUploadingStates>('ideal');


    const { originalImageUrl } = febric;
    const dispatch = useDispatch();



    const nextStepHandler = () => {
        /**
         * In this state we need to check if user trying to add new item to the cart
         * Or user simply came from the cart modify path where they are tryting to modify the cart
         * If user trying to modify the cart then cartIndexToupdate:{index: number | null}
         * Null if user is adding new item to the cart
         * or there will be index
         * If you find any index there which is not null then simply get the the index
         * Use action to dispatch updateCartDataByIndex({index: number, item:CartItem})
         * **/
        if (designJourney === SelectionProcess.accents) {
            setTakeScreenShot('upload');
            return;
        }
        // First get the index of selected step 
        const findIndex = Object.keys(SelectionProcess).indexOf(designJourney);
        // Add one to that index 
        const getNextValue = Object.values(SelectionProcess)[findIndex + 1];
        setDesignJourney(getNextValue);
    }


    const updateFebricHandler = (event: React.MouseEvent<HTMLButtonElement>, params: TFebric) => {
        event.stopPropagation();
        const payload = params;
        dispatch(updateFebric(payload));

        if (collarAccent.updatedFrom === 'febrics') {

            // Update the collor with different febric
            const payloadC: any = {
                ...collarAccent,
                febric: payload.originalImageUrl ?? defaultFebric,
            }
            dispatch(updateAccent({ key: 'collar', payload: payloadC }));
        }

        if (cuffAccent.updatedFrom === 'febrics') {
            const newState = { ...cuffAccent, febric: payload.originalImageUrl ?? defaultFebric }
            dispatch(updateAccent({ key: 'cuff', payload: newState }));
        }
    }

    const updateAccentHandler = (event: React.MouseEvent<HTMLButtonElement>, params: UpdateAccentAction) => {
        event.stopPropagation();
        const { payload } = params;
        const { meshName, type } = activeAccent === 'collar' ? collarAccent : cuffAccent;
        payload.meshName = meshName;
        payload.type = type;
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


    useEffect(() => {
        if (takeScreenShot === 'uploaded') {
            router.push('/cart');
        }
    }, [takeScreenShot, router]);

   



    return (
        <>
            {showFebricDetailsModel && <FebricDetails setShowFebricDetailsModel={setShowFebricDetailsModel} showFebricDetailsModel={showFebricDetailsModel} />
            }
            x
            <Filter setShowFilterModel={setShowFilterModel} showFilterModel={showFilterModel} />
            <AccentFebricModel
                setShowFilterModel={setShowAccentFebricModel}
                showFilterModel={showAccentFebricModel}
                onClickHandler={updateAccentHandler}
            />
            {/* Handling error */}
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
                                collar={collar?.model ?? defaultCollarModel}
                                cuff={cuff}
                                febricURI={originalImageUrl ?? defaultFebric}
                                collarAccent={collarAccent}
                                cuffAccent={cuffAccent}

                            />

                            <CaptureModelScreenShot
                                dispatch={dispatch}
                                takeScreenShot={takeScreenShot}
                                setTakeScreenShot={setTakeScreenShot}
                                // setSnapShotUploadState={setSnapShotUploadState}
                                
                                cartData={
                                    {
                                        model,
                                        accent,
                                        modelType,
                                        subTotal: computePrice,
                                        qty: 1,
                                        discount: 0,
                                        availability: '',
                                        id: 1,
                                        deliveryTime: '3 weeks', 
                                        febric

                                    }
                                } />

                        </Canvas>

                    </div>
                    <div className={styles.infomration}>
                        <div className={styles.row}>
                            <div className={styles.name}>
                                {}
                            </div>
                            <div className={styles.price}>
                                ${computePrice}
                            </div>
                            <div className={styles.feature}>
                                {febric.title}
                            </div>
                            <div className={styles.type}>
                                {febric.material}
                            </div>
                            <div className={styles.ref}>
                                ref: Mayfield
                            </div>
                            <div className={styles.detail__action}>
                                FebricDetails
                            </div>
                        </div>
                        <div className={styles.row}>
                            <Button variant='primary' type='square' onClick={() => takeScreenShot === 'uploading' ? null : nextStepHandler()}>
                                <span>{takeScreenShot === 'uploading' ? 'Please wait...' : 'Next'}</span>
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
