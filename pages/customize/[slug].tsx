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
import { TCollarAccent, UpdateAccentAction, updateAccent } from 'slices/accentSlice';



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
    const [counter, setCounter] = useState(0);
    
    const {collar, febric} = useSelector((state:RootState) => state.model);
    const {collar: collarAccent} = useSelector((state:RootState) => state.accent);
    const {model: febricURI} = febric;

    const dispatch = useDispatch();

    // console.log('collarAccent', collarAccent)


// Hello
    const nextStepHandler = () => {

        if(designJourney === SelectionProcess.accents) {
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
        if(showFilterModel) {
            document.body.style.overflow = 'hidden';
            // document.body.style.display='none';
        }

        if(!showFilterModel) {
            document.body.style.overflow = 'auto';
        }

    }, [showFilterModel]);

    const updateFebricHandler = (event: React.MouseEvent<HTMLButtonElement>, params: UpdateModelAction) => {
        event.stopPropagation();
        const {key, payload} = params;
       dispatch(updateModel({key, payload}));
    }

    const updateCollarFebriceHandler = (event: React.MouseEvent<HTMLButtonElement>, params: UpdateAccentAction) => {
        event.stopPropagation();
        const {key, payload} = params;

        dispatch(updateAccent({key:'collar', payload}));
    }

    return (
        <>
        
     {showFebricDetailsModel && <FebricDetails setShowFebricDetailsModel={setShowFebricDetailsModel} showFebricDetailsModel={showFebricDetailsModel}/>
     }
       
    <Filter setShowFilterModel={setShowFilterModel} showFilterModel={showFilterModel}/>
    <AccentFebricModel 
    setShowFilterModel={setShowAccentFebricModel} 
    showFilterModel={showAccentFebricModel}
    onClickHandler={updateCollarFebriceHandler}
    />
    <div className={styles.container}>
    {/* @ts-ignore */}
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
        
        />}

        {designJourney === 'accents' && <Accents
        setShowAccentFebricModel={setShowAccentFebricModel} 
        showAccentFebricModel={showAccentFebricModel}
        />}
        
    </div>
    <div className={styles.model}>
        
        {/* <Image src='/img/shirt.png' width={503} height={600} alt='model' /> */}
        
        <Shirt3DModel
        collar={collar.model}
        febricURI={febricURI}
        collarAccent={collarAccent}
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


// export async function getStaticPaths() {
//     // Generate dynamic paths based on your data
//     // Example: Fetch slugs from an API or database
//     const paths = ['/customize/slug']; // Replace with your actual data fetching logic
  
//     return {
//       paths,
//       fallback: false, // Set to true if you want to handle unknown slugs at runtime
//     };
//   }


//   type props = {
//     params: any;
//   };
//   export async function getStaticProps({ params }: props) {
//     // Fetch data based on the current slug
//     const data = {}; // Replace with your actual data fetching logic
  
//     return {
//       props: {
//         data,
//       },
//     };
//   }
  