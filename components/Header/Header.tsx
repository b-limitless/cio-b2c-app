import React from 'react';
import styles from  './header.module.scss';
import Image from 'next/image';
import { productNavigation } from 'config/product';
import Navigation from './Navigation';

interface HeaderInterface {
    showNavigation?: boolean
}

export default function Header({showNavigation}: HeaderInterface) {
  return (
    <header className={styles.header}>
        <div className={styles.col}>
        <Image
        src={'/icon/logo.svg'}
        width={206}
        height={46}
        alt='logo'
        />
        </div>
        {showNavigation && <div className={styles.col}>
            <div className={styles.nav}>
                <Navigation data={productNavigation}/>
            </div>
        </div>}

        <div className={styles.col + ' ' + styles.side__menu}>
            <div className={styles.menu}>
                <ul>
                    <input type="radio" name="radio-side-menu" id="clothing" className={styles.radio__side__menu}/>
                    <label htmlFor="clothing">
                    <li>
                        clothin
                    </li>
                    </label>

                    <input type="radio" name="radio-side-menu" id="contact" className={styles.radio__side__menu}/>
                    <label htmlFor="contact">
                    <li>
                        Contact
                    </li>
                    </label>

                    
                    
                    
                </ul>
            </div>
            <div className={styles.icon}>
                <Image
                src={'/icon/cart.svg'}
                width={32}
                height={30.55}
                alt='cart'
                ></Image>
            </div>
        </div>
    </header>
  )
}
