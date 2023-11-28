import Image from 'next/image';
import styles from './filter.module.scss';
interface FilterInterface {
    setShowFilterModel:Function;
    showFilterModel:boolean;
}
export default function AccentFebricModel({setShowFilterModel, showFilterModel}: FilterInterface) {
    return (
        <div className={styles.filter + ' ' + (showFilterModel ? styles.show : styles.hide)}>
            <div className={styles.header}>
                <span className={styles.title}>
                    Select Febric
                </span>
                <span className={styles.close}>
                    <Image src='/icon/close.svg' width={16} height={16} alt='' onClick={() => setShowFilterModel(false)}/>
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
            
        </div>
    )
}
