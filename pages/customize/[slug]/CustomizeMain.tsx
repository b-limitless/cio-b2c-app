
'use client';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


/**
 * Issue: When filtering for one case reporducing in this way
 *   * Just scroll to the bottom of febric sidebar and it will load more data 
 *   * Click to the filter and then it will send 2 request to server for fetching data 
 *   * Issue is page is updated to 0 when its clicked to filter button so that we have new data 
 *   * Due to main priority moving to another feature and will be fixed in next stage
 *   
 *   Line 263 explanation 
 *    When user loading all data then stop this process
      Even user reaches to the end of the scroll bar
      page + 1 * limit === affectedRows then stop
 * **/
import { Canvas } from '@react-three/fiber';
import { Button } from 'components/Button';
import Header from 'components/Header/Header';
import { defaultCollarModel, defaultFebric } from 'config/default';
import { productNavigation } from 'config/product';
import { removeTimestamp } from 'functions/removeTimeStamp';
import useFetchFebrics from 'hooks/useFetchFebric';
import { TSnapShotUploadingStates } from 'interface/ICart.interface';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Shirt3DModel from 'pages/customize/3DModel/Shirt';
import AccentFebricModel from 'pages/customize/Febric/AccentFebricModel';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAccentGlobal, UpdateAccentAction, updateAccent } from 'slices/accentSlice';
import { TCheckIfItemIsSameToUpdateCart } from 'slices/cartSlice';
import { TFebric, updateFebric } from 'slices/febricSlice';
import { RootState } from 'store';
import { selectionProcess, SelectionTypes } from '../../../types/enums';
import Filter from '../Febric/Filter';
import FebricDetails from '../FebricDetails';
import Accents from '../Select/Accents';
import Febrics from '../Select/Febrics';
import Styles from '../Select/Styles';
import styles from '../customize.module.scss';
import CaptureModelScreenShot from './CaptureModelScreenShot';
import { EFebricFilter, updaeFebricsPage, updatFebricFilter } from 'slices/febricsSlice';
import { isScrolledToBottom } from 'functions/scrollToBottom';
const https = require('https');

export const sampleData = {
    originalImageUrl:
      'https://res.cloudinary.com/dun5p8e5d/image/upload/v1704620406/images/ABC/xulgkzie5hkkrvpttxel.png',
    thumbnailImageUrl:
      'https://res.cloudinary.com/dun5p8e5d/image/upload/v1704620416/thumbnails/ABC/jtxc8moiphu8vwqrzjms.png',
    model: {
      collar: {
        id: 12,
        model: '/models/collars/collar-1-1.glb?timestamp=1704620380222',
        price: 0,
        title: 'Default collar model',
        label: 'default',
        code: 'default',
      },
      cuff: {
        id: 12,
        model: '/models/cuffs/cuff-1-normal.glb?timestamp=1704620380222',
        price: 0,
        title: 'default cuff model',
        label: 'default',
        code: 'default',
      },
    },
    accent: {
      collar: {
        id: 12,
        febric: '/img/febric-5.jpg',
        type: 'default',
        meshName: [],
        updatedFrom: 'febrics',
        price: 10,
      },
      cuff: {
        id: 12,
        febric: '/img/febric-5.jpg',
        type: 'default',
        meshName: [],
        updatedFrom: 'febrics',
        price: 10,
      },
    },
    modelType: 'shirt',
    subTotal: 50,
    qty: 1,
    discount: 0,
    availability: '',
    id: 1,
    deliveryTime: '3 weeks',
    febric: {
      id: 1,
      model: '/img/febric-5.jpg',
      price: 30,
      title: 'XYZ',
      material: 'Cotton 80 %',
      tone: 'light',
      febricTypes: 'string',
      season: 'summer',
      label: 'default',
      code: 'default',
      originalImageUrl: '/img/febric-5.jpg',
    },
    status: 'open',
  };


const agent = new https.Agent({
    rejectUnauthorized: false,
    requestCert: false,
    agent: false,
 });


interface ICustomizeMain {
    userId: string | string[]
}
export default function CustomizeMain({userId}: ICustomizeMain) {
    const router = useRouter();
    const [showFilterModel, setShowFilterModel] = useState(false);
    const [showFebricDetailsModel, setShowFebricDetailsModel] = useState(-1);
    const [designJourney, setDesignJourney] = useState<selectionProcess>(selectionProcess.febrics);
    const [showAccentFebricModel, setShowAccentFebricModel] = useState<boolean>(false);
    const [activeAccent, setActiveAccent] = useState<keyof IAccentGlobal>('collar');

    const model = useSelector((state: RootState) => state.model);
    const { collar, cuff } = model;
    const febric =  useSelector((state:RootState) => state.febric); 
    const accent = useSelector((state: RootState) => state.accent);
    const febrics = useSelector((state: RootState) => state.febrics);
    const {data: {filters, page, limit, affectedRows}, loading} = febrics;
    const { modelType } = useSelector((state: RootState) => state.modelType);
    const {index} = useSelector((state: RootState) => state.cartIndexToupdate);
    const cart = useSelector((state: RootState) => state.cart);

    const { collar: collarAccent } = accent;
    const { cuff: cuffAccent } = accent;
    const [takeScreenShot, setTakeScreenShot] = useState<TSnapShotUploadingStates>('ideal');


    const { originalImageUrl } = febric;
    const dispatch = useDispatch();


    const checkIfItemIsSameToUpdateCart = (params: TCheckIfItemIsSameToUpdateCart ) => {
        const {index, ...rest} = params;
        if(index === null) return false;
        const {model, accent, febric, modelType} = cart[index];
        const previousCartData = JSON.stringify({model, accent,  modelType, febric});
        return removeTimestamp(previousCartData) === removeTimestamp(JSON.stringify(rest));
    }

    const nextStepHandler = () => {
        /**
         * There will be two condition user came from modify part -> 
         * 1. Adding same item to the cart
         * 2. Adding modify version of item
         * 
         * Below is explaination for the modify version of item
         * In this state we need to check if user trying to add new item to the cart
         * Or user simply came from the cart modify path where they are tryting to modify the cart
         * If user trying to modify the cart then cartIndexToupdate:{index: number | null}
         * Null if user is adding new item to the cart
         * or there will be index
         * If you find any index there which is not null then simply get the the index
         * Use action to dispatch updateCartDataByIndex({index: number, item:CartItem})
         * If update finllay update the state cartIndexToupdate to null
         * 
         * **/
        if (designJourney === selectionProcess.accents) {
            if(checkIfItemIsSameToUpdateCart({index, model, accent, modelType, febric})) {
                router.push('/cart');
                return;
            }

            setTakeScreenShot('upload');
            return;
        }
        // First get the index of selected step 
        const findIndex = Object.keys(selectionProcess).indexOf(designJourney);
        // Add one to that index 
        const getNextValue = Object.values(selectionProcess)[findIndex + 1];
        setDesignJourney(getNextValue);
    }


    const updateFebricHandler = (event: React.MouseEvent<HTMLButtonElement>, params: TFebric) => {
        event.stopPropagation();
        const payload = params;
        dispatch(updateFebric(payload));

        if (collarAccent.updatedFrom === 'febrics') {
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
        if(febric.price) {
            return febric.price + collarAccent.price + cuffAccent.price;
        }

        return 0;
        
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

    const updateFebricFiltersHandler = (key: EFebricFilter, value:string) => {
        const container = document.getElementById('febrics-scroll-container');
        if(container) {
            container.scrollTop = 0;
        }
       
        dispatch(updaeFebricsPage(0));
        dispatch(updatFebricFilter({key, value}));
    }


    useEffect(() => {
        if (takeScreenShot === 'uploaded') {
            router.push('/cart');
        }
    }, [takeScreenShot, router]);

    

    useEffect(() => {
        const container = document.getElementById('febrics-scroll-container');

        function handleScroll() {
            if(isScrolledToBottom(container)) {
                if(((page + 1) * limit) !== affectedRows && !loading) {
                    dispatch(updaeFebricsPage(page ? page + 1 : 1))
                }
            }
        }

        container?.addEventListener('scroll', handleScroll);

        return () => {
            container?.removeEventListener('scroll', handleScroll);
        }
        
    }, [page, dispatch, affectedRows, limit, loading]);
    

    useFetchFebrics({userId, filters: JSON.stringify(filters), page});

    // main content style need to be dynamic

    const getClass = useMemo(() => {
        return designJourney === selectionProcess.febrics ? styles.febrics : 
               designJourney === selectionProcess.styles ? styles.styles : 
               designJourney === selectionProcess.accents ? styles.styles : 
               'default';
    }, [designJourney]);

    
    return (
        <>
            {showFebricDetailsModel > -1 && <FebricDetails 
                  setShowFebricDetailsModel={setShowFebricDetailsModel}
                  showFebricDetailsModel={showFebricDetailsModel} 
                  febric={showFebricDetailsModel > -1 ? febrics.data.febrics[showFebricDetailsModel] : null}
                  />
            }
            
            <Filter 
            setShowFilterModel={setShowFilterModel} 
            showFilterModel={showFilterModel} 
            updateFebricFiltersHandler={updateFebricFiltersHandler}
            />

            <AccentFebricModel
                setShowFilterModel={setShowAccentFebricModel}
                showFilterModel={showAccentFebricModel}
                onClickHandler={updateAccentHandler}
            />
           
            <div className={styles.container}>

                <Header 
                  navigations={productNavigation} 
                  designJourney={designJourney} 
                  setDesignJourney={setDesignJourney} 
                  showNavigation 
                  userId={userId ?? ''}
                  />
<main className={`${styles.main__content} ${getClass}`}>
  {/* Your main content goes here */}


                    <div className={styles.filter}>
                        <div className={styles.title}>Select {designJourney}</div>


                        {designJourney === selectionProcess.febrics &&
                            <Febrics
                                setShowFilterModel={setShowFilterModel}
                                setShowFebricDetailsModel={setShowFebricDetailsModel}
                                onClickHandler={updateFebricHandler}
                                febrics={febrics}
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

                        <Canvas>
                            <Shirt3DModel
                                collar={collar?.modelURL ?? defaultCollarModel}
                                cuff={cuff}
                                febricURI={originalImageUrl ?? defaultFebric}
                                collarAccent={collarAccent}
                                cuffAccent={cuffAccent}
                            />

                            <CaptureModelScreenShot
                                dispatch={dispatch}
                                takeScreenShot={takeScreenShot}
                                setTakeScreenShot={setTakeScreenShot}
                                index={index}
                                cartData={
                                    {
                                        model,
                                        accent,
                                        modelType,
                                        subTotal: computePrice,
                                        qty: 1,
                                        discount: 0,
                                        availability: '',
                                        id: cart.length + 1,
                                        deliveryTime: '3 weeks', 
                                        febric,
                                        
                                    }
                                }
                                cart={cart}
                        
                                />
                        </Canvas>

                    </div>
                    <div className={styles.infomration}>
                        <div className={styles.row}>
                            <div className={styles.name}>
                                {}
                            </div>
                            <div className={styles.price}>
                                ${computePrice.toFixed(2)}
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
                                <span style={{whiteSpace:'nowrap'}}>{takeScreenShot === 'uploading' ? 'Please wait...' : 'Next'}</span>

                                
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
