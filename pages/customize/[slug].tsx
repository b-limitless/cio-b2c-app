import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/Header/Header';
import { productNavigation } from 'config/product';
import Image from 'next/image';
import { Button } from 'components/Button';
import styles from './customize.module.scss';
import Febric from './Febric';
import Filter from './Febric/Filter';
import { CheckboxWithLabel } from '@pasal/cio-component-library';
import FebricDetails from './FebricDetails';
import { SelectionProcess, SelectionTypes } from '../../types/enums';
import { selectClasses } from '@mui/material';
import Febrics from './Select/Febrics';
import Styles from './Select/Styles';
import Accents from './Select/Accents';
import { OrderProcessType } from '../../types/enums';
import Shirt3DModel from './3DModel/Shirt';


//  State that need for the model customization
// If this is shirt

// Style

const customization = {
    febric: {

    },
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
            id: null
        }
    }, 
    cuff: {
        selected: 'By Default',
        febric: {
            id: null
        }
    }, 
    buttonWhole: {

    }, 
    buttonThread: {

    }, 
    buttons: {
        
    }
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

    }, [showFilterModel])

    return (
        <>
        
     {showFebricDetailsModel && <FebricDetails setShowFebricDetailsModel={setShowFebricDetailsModel} showFebricDetailsModel={showFebricDetailsModel}/>
     }
       
       <Filter setShowFilterModel={setShowFilterModel} showFilterModel={showFilterModel}/>
        <div className={styles.container}>
            {/* @ts-ignore */}
            <Header navigations={productNavigation} designJourney={designJourney} setDesignJourney={setDesignJourney} showNavigation />
            <main className={styles.main__content}>

                <div className={styles.filter}>
                <div className={styles.title}>Select {designJourney}</div>

            
                    {designJourney === 'febrics' && <Febrics 
                      setShowFilterModel={setShowFilterModel} 
                      setShowFebricDetailsModel={setShowFebricDetailsModel}
                    />}

                    {designJourney === 'styles' && <Styles/>}

                    {designJourney === 'accents' && <Accents/>}
                    
                </div>
                <div className={styles.model}>
                   
                    {/* <Image src='/img/shirt.png' width={503} height={600} alt='model' /> */}
                    <Shirt3DModel/>
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
  