import Image from 'next/image';
import Febric from 'pages/customize/Febric/Febric';
import React from 'react';
import { UpdateModelAction } from 'slices/modelSlice';
import styles from './febric.module.scss';
import { sampleFebric } from 'sample/sample-febrics';
import { TFebric } from 'slices/febricSlice';
import FebricLoader from 'pages/customize/Febric/loaders/FebricLoader';
import Skeleton from '@mui/material/Skeleton';
import FilterFebricLoader from 'pages/customize/Febric/loaders/FilterFebricLoader';
import { IFebrics } from 'slices/febricsSlice';

interface FebricInterface {
  setShowFilterModel: Function;
  setShowFebricDetailsModel: Function;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>, febric: TFebric) => void;
  febrics: IFebrics
}
const countArray = new Array(20).fill(0);


export default function Febrics({ setShowFilterModel, setShowFebricDetailsModel, onClickHandler, febrics }: FebricInterface) {
  
  return (
    <>
      <div className={styles.action}>
        {febrics?.loading && <FilterFebricLoader/>}

        {/* 135px height 21 */}
        {!febrics?.loading && <>
          <Image src='/icon/filter.svg' width={14} height={10} alt='filter' onClick={() => setShowFilterModel(true)}></Image>
          <div className={styles.text}>
            <span className={styles.febric}>
              FILTERS
            </span>
            <span className={styles.count}>
              (100 Febrics)
            </span>

          </div>
        </>}


      </div>

      <div className={styles.febrics}>
        <>
          {febrics?.data?.febrics?.map((febric, i) => <Febric
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


          {/* {countArray.map((_, i) => <Febric
            febricImageURI='/img/febric-thumnail.png'
            key={'febri-item' + i}
            setShowFebricDetailsModel={setShowFebricDetailsModel}
            onClick={(event: any) => { }}

          />)} */}

          {febrics?.loading && countArray.map((_, i) => <FebricLoader
            key={`febric-loader-${i}`}

          />)}

        </>

      </div>
    </>
  )
}
