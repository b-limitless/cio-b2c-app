import { filterData } from 'config/filter';
import Image from 'next/image';
import FilterItem from './FilterItem';
import styles from './filter.module.scss';

interface FilterInterface {
    setShowFilterModel:Function;
    showFilterModel:boolean;
}
export default function Filter({setShowFilterModel, showFilterModel}: FilterInterface) {
    return (
        <div className={styles.filter + ' ' + (showFilterModel ? styles.show : styles.hide)}>
            <div className={styles.header}>
                <span className={styles.title}>
                    FILTER
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
            <div className={styles.toggle__container}>
                {filterData.map((filter, i) => <FilterItem
                    key={`filter-item-${i}`}
                    name={filter.name} 
                    code={filter.code}
                    childrens={filter.childrens}
                    type={filter.type}
                />
                )}
                {/* <div className={styles.item}>
                    <input hidden type='checkbox' name='' id='category' className={styles.options__checkbox} />

                    <label htmlFor='category' className={styles.label}>
                        <span className={styles.title}>
                            CATEGORY
                        </span>
                        <span className={styles.indicator}>
                            <Image width={14} height={8} src={'/icon/arrow-up.svg'} alt=''></Image>
                        </span>
                    </label>

                    <div className={styles.form__element}>
                        <div className={styles.wrapper}>
                            <CheckboxWithLabel label='New' />
                            <CheckboxWithLabel label='Eco/Organic' />
                            <CheckboxWithLabel label='New' />
                            <CheckboxWithLabel label='Eco/Organic' />
                            <CheckboxWithLabel label='New' />
                            <CheckboxWithLabel label='Eco/Organic' />
                        </div>
                    </div>
                </div>

                <div className={styles.item}>
                    <input hidden type='checkbox' name='' id='material' className={styles.options__checkbox} />

                    <label htmlFor='material' className={styles.label}>
                        <span className={styles.title}>
                            MATERIAL
                        </span>
                        <span className={styles.indicator}>
                            <Image width={14} height={8} src={'/icon/arrow-up.svg'} alt=''></Image>
                        </span>
                    </label>

                    <div className={styles.form__element}>
                        <div className={styles.wrapper}>
                            <CheckboxWithLabel label='New' />
                            <CheckboxWithLabel label='Eco/Organic' />
                            <CheckboxWithLabel label='New' />
                            <CheckboxWithLabel label='Eco/Organic' />
                            <CheckboxWithLabel label='New' />
                            <CheckboxWithLabel label='Eco/Organic' />
                        </div>
                    </div>
                </div>

                <div className={styles.item}>
                    <input hidden type='checkbox' name='' id='colors' className={styles.options__checkbox} />

                    <label htmlFor='colors' className={styles.label}>
                        <span className={styles.title}>
                            COLORS
                        </span>
                        <span className={styles.indicator}>
                            <Image width={14} height={8} src={'/icon/arrow-up.svg'} alt=''></Image>
                        </span>
                    </label>

                    <div className={styles.form__element}>
                        <div className={styles.colors}>

                            {colors.map((color, i) => <Color i={i} key={`${color}-${i}`} title={color.title} hex={color.hex} />)}
                        </div>
                    </div>
                </div>

                <div className={styles.item}>
                    <input hidden type='checkbox' name='' id='material' className={styles.options__checkbox} />

                    <label htmlFor='material' className={styles.label}>
                        <span className={styles.title}>
                            MATERIAL
                        </span>
                        <span className={styles.indicator}>
                            <Image width={14} height={8} src={'/icon/arrow-up.svg'} alt=''></Image>
                        </span>
                    </label>

                    <div className={styles.form__element}>
                        <div className={styles.wrapper}>
                            <CheckboxWithLabel label='New' />
                            <CheckboxWithLabel label='Eco/Organic' />
                            <CheckboxWithLabel label='New' />
                            <CheckboxWithLabel label='Eco/Organic' />
                            <CheckboxWithLabel label='New' />
                            <CheckboxWithLabel label='Eco/Organic' />
                        </div>
                    </div>
                </div> */}


            </div>
        </div>
    )
}
