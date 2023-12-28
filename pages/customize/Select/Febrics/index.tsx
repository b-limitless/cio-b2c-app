import Image from 'next/image';
import Febric from 'pages/customize/Febric/Febric';
import React from 'react';
import { useDispatch } from 'react-redux';
import { UpdateModelAction } from 'slices/modelSlice';
import styles from './febric.module.scss';
import { sampleFebric } from './sample-febrics';

interface FebricInterface {
  setShowFilterModel: Function;
  setShowFebricDetailsModel: Function;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>, params: UpdateModelAction) => void;
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
            onClick={(event: any) => onClickHandler(event, {
              key: 'febric', payload: {
                id: i,
                model: febric.originalImageUrl,
                price: febric.price,
                title: febric.title,
                originalImageUrl: febric.originalImageUrl,
                userId: febric.userId,
                deliveryTime: febric.deliveryTime,
                material: febric.material,
                tone: febric.tone,
                febricTypes: febric.febricTypes,
              }
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
