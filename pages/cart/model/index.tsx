import React from 'react';
import Image from 'next/image';
import CloseSVGBlue from '/icon/close-blue.svg';
import styles from './model.module.scss';
import { ICartItem } from 'slices/cartSlice';



const dummyCount = new Array(5).fill(0);

interface IRow {
    title: string;
    value: string;
}

interface IModel {
    show: number;
    setShow: Function;
    setSelectedCartIndex: Function;
    cart: ICartItem | null
}

const Item = ({ title, value }: IRow) => {
    return <div className={styles.item}>
        <span className={styles.title}>
            {title}
        </span>

        <span className={styles.value}>
            {value}
        </span>
    </div>;
}



export default function Model({ show, setShow, cart }: IModel) {

    return (
        <div className={styles.model__container + ' ' + (show > 0 ? styles.show : styles.hide)}>
            <div className={styles.model}>
                <div className={styles.contents}>
                    <div className={styles.col}>
                        <div className={styles.row}>
                            <Image className={styles.main__img} src={cart?.originalImageUrl ?? '/img/shirt-1.png'} width={330} height={439} alt='' />
                        </div>
                    </div>
                    <div className={styles.col + ' ' + styles.details}>
                        <div className={styles.row + ' ' + styles.head}>
                            <div className={styles.heading}>
                                {cart?.model?.febric?.title} | {cart?.model?.febric?.material}  {cart?.model?.febric?.title} | {cart?.model?.febric?.season}
                            </div>
                            <div className={styles.closing}>
                                <Image src='/icon/close-blue.svg' width={20} height={20} alt='close' onClick={() => setShow(-1)} />
                            </div>
                        </div>

                        {/* <div className={styles.row}>
                            <span className={styles.details}>
                                Details
                            </span>
                        </div> */}

                        <div className={styles.row}>
                            <div className={styles.list__details}>
                                <div className={styles.group}>
                                    <div className={styles.title}>
                                        Details
                                    </div>

                                    <div className={styles.childrens}>
                                        <Item title={'Cuff'} value={cart?.model?.collar?.label || ''} />

                                        <Item title={'Collar'} value={cart?.model?.cuff?.label || ''} />
                                        {dummyCount.map((_, i) => <Item key={i} title={'title'} value={'something about value'} />)}
                                    </div>
                                </div>

                                <div className={styles.group}>
                                    <div className={styles.title}>
                                        Style
                                    </div>

                                    <div className={styles.childrens}>
                                        <Item title={'Cuff'} value={cart?.model?.collar?.label || ''} />

                                        <Item title={'Collar'} value={cart?.model?.cuff?.label || ''} />
                                        {dummyCount.map((_, i) => <Item key={i} title={'title'} value={'something about value'} />)}
                                    </div>
                                </div>


                                <div className={styles.group}>
                                    <div className={styles.title}>
                                        Accent
                                    </div>

                                    <div className={styles.childrens}>
                                        <Item title={'Cuff'} value={cart?.model?.collar?.label || ''} />

                                        <Item title={'Collar'} value={cart?.model?.cuff?.label || ''} />
                                        {dummyCount.map((_, i) => <Item key={i} title={'title'} value={'something about value'} />)}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
