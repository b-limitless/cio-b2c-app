import Image from 'next/image';
import styles from './filter.module.scss';
import Febric from './Febric';
import febricStyle from '../common.module.scss';
import { ModelKeys } from 'slices/modelSlice';
import { accentFebrics } from 'config/models';
interface FilterInterface {
    setShowFilterModel: Function;
    showFilterModel: boolean;
    onClickHandler: any;
}


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

                {accentFebrics.map((febric, i) => <Febric
                    febricImageURI={febric.febricURI}
                    key={'febri-item-custom' + i}
                    setShowFebricDetailsModel={() => null}
                    onClick={(event: any) => onClickHandler(event,
                        {
                            key: 'collar',
                            payload: {
                                id: i, febric: febric.febricURI,
                                price: febric.price
                            }
                        })}
                />)}

            </div>

        </div>
    )
}
