import React from 'react';
import Image from 'next/image';
import CloseSVGBlue from '/icon/close-blue.svg';
import styles from './model.module.scss';

export default function Model() {
    return (
        <div className={styles.model__container}>
            <div className={styles.model}>
                <div className={styles.contents}>
                    <div className={styles.col}>
                        <div className={styles.row}>
                            <Image className={styles.main__img} src='/img/shirt-1.png' width={330} height={439} alt='' />
                        </div>
                    </div>
                    <div className={styles.col + ' '+ styles.details}>
                        <div className={styles.row +' '+ styles.head}>
                            <div className={styles.heading}>
                                Light Blue Cotton Shirt
                            </div>
                            <div className={styles.closing}>
                                <Image src='/icon/close-blue.svg' width={20} height={20} alt='close' />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.details}>
                                Details
                            </span>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.list__details}>
                                <div className={styles.item}>
                                    <span className={styles.title}>
                                        Graphi Design
                                    </span>

                                    <span className={styles.value}>
                                        publishing and graphic design
                                    </span>
                                </div>
                                <div className={styles.item}>
                                    <span className={styles.title}>
                                        Graphi Design
                                    </span>

                                    <span className={styles.value}>
                                        publishing and graphic design
                                    </span>
                                </div>
                                <div className={styles.item}>
                                    <span className={styles.title}>
                                        Graphi Design
                                    </span>

                                    <span className={styles.value}>
                                        publishing and graphic design
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
