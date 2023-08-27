import React from 'react';
import styles from './febric.module.scss';
import Image from 'next/image';
import Filter from './Filter';

export default function Febric() {
    return (
        <>
        <div className={styles.febric}>
            <div className={styles.img}>
                <Image alt='' src='/img/febric-thumnail.png' width={140} height={103} ></Image>

                <Image src={'/icon/search.svg'} className={styles.search__icon} width={14} height={14} alt='search'></Image>

                <span className={styles.feature}>
                    NEW
                </span>
            </div>
            <div className={styles.short__description}>
                <div className={styles.col}>
                    <div className={styles.name}>
                        Mayfield
                    </div>
                    <div className={styles.type}>
                        <span className={styles.fade}>
                            COTTON -
                        </span>
                        <div className={styles.bold}>
                            ESSENTIAL
                        </div>
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.price}>
                        $90
                    </div>
                </div>
            </div>

        </div>
        </>
        
    )
}
