import { ColorInterface } from "./filter.interface"
import styles from './filter.module.scss';

const Color = ({ title, hex, i }: ColorInterface) => {
    return <>
        <input type="checkbox" hidden name="color" id={title + hex + i} className={styles.color__checkbox} />
        <label htmlFor={title + hex + i} className={styles.label}>
            <span className={styles.color} style={{ backgroundColor: `${hex}` }}></span>
        </label>
    </>
}

export default Color;