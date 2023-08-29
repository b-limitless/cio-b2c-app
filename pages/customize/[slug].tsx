import React, { useState } from 'react';
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

const countArray = new Array(20).fill(0);

export default function Customize() {
    const router = useRouter();
    const [showFilterModel, setShowFilterModel] = useState(false);
    const [showFebricDetailsModel, setShowFebricDetailsModel] = useState(false);

    console.log(showFilterModel)
    return (
        <>
        
     {showFebricDetailsModel && <FebricDetails setShowFebricDetailsModel={setShowFebricDetailsModel} showFebricDetailsModel={showFebricDetailsModel}/>
     }
       
       <Filter setShowFilterModel={setShowFilterModel} showFilterModel={showFilterModel}/>
        <div className={styles.container}>
            <Header navigations={productNavigation} showNavigation />
            
            <main className={styles.main__content}>
                <div className={styles.filter}>
                    <div className={styles.action}>
                        <Image src='/icon/filter.svg' width={14} height={10} alt='filter' onClick={() => setShowFilterModel(true)}></Image>
                        <div className={styles.text}>
                            <span className={styles.febric}>
                            FILTERS
                            </span>
                            
                            <span className={styles.count}>
                            (100 Febrics)
                            </span>
                                 
                        </div>
                        
                    </div>

                    <div className={styles.febrics}>
                        {countArray.map((_, i) => <Febric key={'febri-item' + i} setShowFebricDetailsModel={setShowFebricDetailsModel}/>)}
                    </div>
                </div>
                <div className={styles.model}>
                    <Image src='/img/shirt.png' width={503} height={600} alt='model' />
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
                        <Button variant='primary' type='square'>
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
