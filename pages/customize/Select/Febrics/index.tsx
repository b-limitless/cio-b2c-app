import Image from 'next/image';
import Febric from 'pages/customize/Febric/Febric';
import React from 'react';
import { useDispatch } from 'react-redux';
import { UpdateModelAction } from 'slices/modelSlice';
import styles from './febric.module.scss';

interface FebricInterface {
  setShowFilterModel: Function;
  setShowFebricDetailsModel: Function;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>, params: UpdateModelAction) => void;
}
const countArray = new Array(20).fill(0);

const febrics = [{
  febricURI: '/img/febric1.jpg',
  price: 20
},
{
  febricURI: '/img/febric-5.jpg', 
  price: 30
},
{
  febricURI: '/img/febric-6.jpg', 
  price: 40
}]

export default function Febrics({ setShowFilterModel, setShowFebricDetailsModel, onClickHandler }: FebricInterface) {
  const dispatch = useDispatch();
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
          {febrics.map((febric, i) => <Febric
            febricImageURI={febric.febricURI}
            key={'febri-item-custom' + i}
            setShowFebricDetailsModel={setShowFebricDetailsModel}
            onClick={(event: any) => onClickHandler(event, { key: 'febric', payload: { id: i, model: febric.febricURI, price: febric.price } })}
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
