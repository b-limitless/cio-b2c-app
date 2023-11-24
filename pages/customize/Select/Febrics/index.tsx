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
      <>
      <Febric 
          febricImageURI='/img/febric1.jpg'
          key={'febri-item' + 100} 
          setShowFebricDetailsModel={setShowFebricDetailsModel}/>

      <Febric 
          febricImageURI='/img/febric-5.jpg'
          key={'febri-item' + 'feb-5'} 
          setShowFebricDetailsModel={setShowFebricDetailsModel}/>

<Febric 
          febricImageURI='/img/febric-6.jpg'
          key={'febri-item' + 'feb-6'} 
          setShowFebricDetailsModel={setShowFebricDetailsModel}/>

      {countArray.map((_, i) => <Febric 
          febricImageURI='/img/febric-thumnail.png'
          key={'febri-item' + i} 
          setShowFebricDetailsModel={setShowFebricDetailsModel}/>)}
      
      </>
        
    </div>
    </>
  )
}
