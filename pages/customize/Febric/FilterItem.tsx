import { FilterItemInterface } from "./filter.interface"
import styles from './filter.module.scss';
import Image from "next/image";
import { CheckboxWithLabel } from "components/Checkbox/Checkbox";
import Color from "./Color";

const colors = [{
    title: "Red",
    hex: "#FF0000"
},
{
    title: "green",
    hex: "green"
},
{
    title: "blue",
    hex: "blue"
},
{
    title: "Red",
    hex: "#FF0000"
},
{
    title: "green",
    hex: "green"
},
{
    title: "blue",
    hex: "blue"
}
]



const FilterItem = ({ label, value, childrens, type }: FilterItemInterface) => {
    return <div className={styles.item}>
        <input hidden type='checkbox' name='' id={value} className={styles.options__checkbox} />

        <label htmlFor={value} className={styles.label}>
            <span className={styles.title}>
                {label}
            </span>
            <span className={styles.indicator}>
                <Image width={14} height={8} src={'/icon/arrow-up.svg'} alt=''></Image>
            </span>
        </label>

        <div className={styles.form__element}>
            {type === 'text' && 
            <div className={styles.wrapper}>
                {childrens.map((children, i) => <CheckboxWithLabel key={`${i}-filter-checkbox`} label={children.label} />)}
            </div>}


            {type === 'color' && 
            <div className={styles.colors}>
                {colors.map((color, i) => <Color i={i} key={`${color}-${i}`} title={color.title} hex={color.hex} />)}
            </div>}

            
        </div>
    </div>
}

export default FilterItem;