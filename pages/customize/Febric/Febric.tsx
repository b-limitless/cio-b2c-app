import Image from 'next/image';
import React from 'react';
import styles from './febric.module.scss';

interface FebricInterface {
    setShowFebricDetailsModel: Function;
    febricImageURI: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    [x:string]:any; 
    index:number;
    
}

export default function Febric({ setShowFebricDetailsModel, febricImageURI, onClick, index}: FebricInterface) {
    return (
        <>
            <div className={styles.febric} onClick={(e:any) => onClick(e)}>
                <div className={styles.img}>
                    <Image alt='' src={febricImageURI} width={140} height={103} ></Image>

                    <Image src={'/icon/search.svg'} className={styles.search__icon} width={14} height={14} alt='search' onClick={(e:any) => {
                        e.stopPropagation();
                        setShowFebricDetailsModel(index)
                    }}></Image>

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
