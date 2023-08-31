import React from 'react'
import styles from './febric.module.scss';
import Image from 'next/image';
import Febric from 'pages/customize/Febric/Febric';

interface FebricInterface {
    setShowFilterModel:Function;
    setShowFebricDetailsModel:Function;
}
const countArray = new Array(20).fill(0);

export default function Febrics({setShowFilterModel, setShowFebricDetailsModel}: FebricInterface) {
  return (
    <>
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
    </>
  )
}
