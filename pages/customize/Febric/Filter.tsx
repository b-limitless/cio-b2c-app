import React from 'react'
import styles from './filter.module.scss';
import Image from 'next/image';
import { CheckboxWithLabel } from '@pasal/cio-component-library';



export default function Filter() {
    
    return (
        <div className={styles.filter}>
            <div className={styles.header }>
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
                        <label htmlFor='category' className={styles.label}>
                            <span className={styles.title}>
                                CATEGORY
                            </span>
                            <span className={styles.indicator}>
                                <Image width={14} height={8} src={'/icon/arrow-up.svg'} alt=''></Image>
                            </span>
                        </label>
                        <input hidden type='checkbox' name='' id='category' />
                       
                        <div className={styles.form__element}>
                            {/* <CheckboxWithLabel label='New'/> */}
                            {/* <CheckboxWithLabel label='Eco/Organic'/>
                            <CheckboxWithLabel label='New'/>
                            <CheckboxWithLabel label='Eco/Organic'/>
                            <CheckboxWithLabel label='New'/>
                            <CheckboxWithLabel label='Eco/Organic'/> */}
                        </div>
                    
                </div>
            </div>
        </div>
    )
}
