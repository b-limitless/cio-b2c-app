import React from 'react';
import Image from 'next/image';
import CloseSVGBlue from '/icon/close-blue.svg';
import styles from './model.module.scss';

const Item = () => {
    return <div className={styles.item}>
        <span className={styles.title}>
            Graphi Design
        </span>

        <span className={styles.value}>
            publishing and graphic design
        </span>
    </div>;
}

const dummyCount = new Array(10).fill(0);

interface IModel {
    show: number; 
    setShow:Function;
    setSelectedCartIndex:Function;
}
export default function Model({show, setShow}: IModel) {
    console.log('show', show)
    return (
        <div className={styles.model__container + ' ' + (show > 0 ? styles.show : styles.hide)}>
            <div className={styles.model}>
                <div className={styles.contents}>
                    <div className={styles.col}>
                        <div className={styles.row}>
                            <Image className={styles.main__img} src='/img/shirt-1.png' width={330} height={439} alt='' />
                        </div>
                    </div>
                    <div className={styles.col + ' ' + styles.details}>
                        <div className={styles.row + ' ' + styles.head}>
                            <div className={styles.heading}>
                                Light Blue Cotton Shirt
                            </div>
                            <div className={styles.closing}>
                                <Image src='/icon/close-blue.svg' width={20} height={20} alt='close' onClick={() => setShow(-1)}/>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.details}>
                                Details
                            </span>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.list__details}>
                                {dummyCount.map((_, i) => <Item key={i}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
