import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function Styles() {
  return (
   <div className={styles.styles__container}>
        <div className={styles.row}>
            <div className={styles.title}>COLLARS</div>
            <div className={styles.items}>
                <>
                <input className={styles.checkbox}type='radio' name='collar' id='style-1' hidden/>
                <label className={styles.item} htmlFor='style-1'>
                <span className={styles.col}>
                    <Image src='/icon/collars/button-down.svg' width={60} height={51.93} alt='styles'/>
                    <span className={styles.style__name}>Button down</span>
                </span>
                </label>
                </>

                <>
                <input className={styles.checkbox}type='radio' name='collar' id='style-2' hidden/>
                <label className={styles.item} htmlFor='style-2'>
                <span className={styles.col}>
                    <Image src='/icon/collars/button-down.svg' width={60} height={51.93} alt='styles'/>
                    <span className={styles.style__name}>Button down</span>
                </span>
                </label>
                </>
                
            </div>
        </div>
        {/* <div className={styles.row}>
            <div className={styles.title}>COLLARS</div>
            <div className={styles.items}>
                <div className={styles.item}>
                <div className={styles.col}>
                    <Image src='/icon/collars/button-down.svg' width={60} height={51.93} alt='styles'/>
                    <div className={styles.style__name}>Button down</div>
                </div>
                </div>
               
                <div className={styles.item}>
                <div className={styles.col}>
                    <Image src='/icon/collars/button-down.svg' width={60} height={51.93} alt='styles'/>
                    <div className={styles.style__name}>Button down</div>
                </div>
                </div>

                <div className={styles.item}>
                <div className={styles.col}>
                    <Image src='/icon/collars/button-down.svg' width={60} height={51.93} alt='styles'/>
                    <div className={styles.style__name}>Button down</div>
                </div>
                </div>
            </div>
        </div> */}
   </div>
  )
}
