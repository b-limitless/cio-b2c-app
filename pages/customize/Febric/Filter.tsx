import React from 'react'
import styles from './filter.module.scss';
import Image from 'next/image';
import { CheckboxWithLabel } from 'components/Checkbox/Checkbox';

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
export default function Filter() {
    return (
        <div className={styles.filter}>
            <div className={styles.header}>
                <span className={styles.title}>
                    FILTER
                </span>
                <span className={styles.close}>
                    <Image src='/icon/close.svg' width={16} height={16} alt='' />
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
                <div className={styles.item}>
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
                        <div className={styles.wrapper + ' ' + styles.colors}>
                            <>
                            <input  type="checkbox" hidden name="color" id="red" className={styles.color__checkbox}/>
                            <label htmlFor="red" className={styles.label}>
                                <span className={styles.color}></span>
                            </label>
                            </>
                            
                            <>
                                <input hidden type="checkbox" name="color" id="green" className={styles.color__checkbox}/>
                                <label htmlFor="green" className={styles.label}>
                                    <span className={styles.color}></span>
                                </label>
                            </>
                            
                        </div>
                    </div>
                </div>

                {/* <div className={styles.item}>
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
