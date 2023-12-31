import Image from 'next/image';
import Febric from 'pages/customize/Febric/Febric';
import React from 'react';
import { UpdateModelAction } from 'slices/modelSlice';
import styles from './febric.module.scss';
import { sampleFebric } from 'sample/sample-febrics';
import { TFebric } from 'slices/febricSlice';

interface FebricInterface {
  setShowFilterModel: Function;
  setShowFebricDetailsModel: Function;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>, febric: TFebric) => void;
}
const countArray = new Array(20).fill(0);


export default function Febrics({ setShowFilterModel, setShowFebricDetailsModel, onClickHandler }: FebricInterface) {

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
          {sampleFebric.map((febric, i) => <Febric
            febricImageURI={febric.originalImageUrl}
            key={'febri-item-custom' + i}
            setShowFebricDetailsModel={setShowFebricDetailsModel}
            onClick={(event: any) => onClickHandler(event,
              {
                id: i,
                model: febric.originalImageUrl,
                price: febric.price,
                title: febric.title,
                originalImageUrl: febric.originalImageUrl,
                material: febric.material,
                tone: febric.tone,
                febricTypes: febric.febricTypes,

              })}
          />)}


          {countArray.map((_, i) => <Febric
            febricImageURI='/img/febric-thumnail.png'
            key={'febri-item' + i}
            setShowFebricDetailsModel={setShowFebricDetailsModel}
            onClick={(event: any) => { }}

          />)}

        </>

      </div>
    </>
  )
}
