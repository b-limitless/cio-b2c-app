import Image from 'next/image';
import styles from './filter.module.scss';
import Febric from './Febric';
import febricStyle from '../common.module.scss';
import { ModelKeys } from 'slices/modelSlice';
interface FilterInterface {
    setShowFilterModel: Function;
    showFilterModel: boolean;
    onClickHandler: any;
}

const countArray = new Array(20).fill(0);

const febrics = [{
    febricURI: '/img/febric1.jpg',
    price: 0
},
{
    febricURI: '/img/febric-5.jpg',
    price: 0
},
{
    febricURI: '/img/febric-6.jpg',
    price: 0
}]


export default function AccentFebricModel({ onClickHandler, setShowFilterModel, showFilterModel }: FilterInterface) {
    return (
        <div className={styles.filter + ' ' + (showFilterModel ? styles.show : styles.hide)}>
            <div className={styles.header}>
                <span className={styles.title}>
                    Select Febric
                </span>
                <span className={styles.close}>
                    <Image src='/icon/close.svg' width={16} height={16} alt='' onClick={() => setShowFilterModel(false)} />
                </span>
            </div>
            <div className={styles.num__febrics}>
                <span className={styles.bold}>
                    500
                </span>
                <span className={styles.text}>
                    Febrics
                </span>
            </div>
            {/* Rather we will show different kind of febrics here */}

            <div className={febricStyle.febrics}>

                {febrics.map((febric, i) => <Febric
                    febricImageURI={febric.febricURI}
                    key={'febri-item-custom' + i}
                    setShowFebricDetailsModel={() => null}
                    onClick={(event: any) => onClickHandler(event, { key : 'collar', payload: { id: i, meshName: [], febric: febric.febricURI, type: 'default' } })}
                />)}


                {/* {countArray.map((_, i) => <Febric
                    febricImageURI='/img/febric-thumnail.png'
                    key={'febri-item' + i}
                    setShowFebricDetailsModel={() => null}
                    onClick={(event: any) => { }}

                />)} */}



            </div>

        </div>
    )
}
