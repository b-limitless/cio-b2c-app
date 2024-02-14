import React from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import Navigation, { navigationRow } from './Navigation';
import { OrderProcessType, SelectionTypes, combinedTypes } from 'types/enums';
import Link from 'next/link';



interface HeaderInterface {
    showNavigation?: boolean;
    navigations?: navigationRow[]
    designJourney?: combinedTypes;
    setDesignJourney?: Function;
    userId: string | string[]
}

export default function Header({userId, showNavigation, navigations, designJourney, setDesignJourney}: HeaderInterface) {

    
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
            {showNavigation && navigations && <div className={styles.col}>
                <div className={styles.nav}>
                    <Navigation data={navigations} designJourney={designJourney} setDesignJourney={setDesignJourney} />
                </div>
            </div>}

            <div className={styles.col + ' ' + styles.side__menu}>
                <div className={styles.menu}>
                    <ul>
                        {/* <input type="radio" name="radio-side-menu" id="clothing" className={styles.radio__side__menu} />
                        <label htmlFor="clothing">
                            <Link href={'/auth/signin'}>
                            <li>
                                Sign in
                            </li>
                            </Link>
                            
                        </label> */}

                        <input type="radio" name="radio-side-menu" id="clothing" className={styles.radio__side__menu} />
                        <label htmlFor="clothing">
                            <Link href={'/auth/signin'}>
                            <li className={styles.auth__menu}>
                                Hi, Bharat

                                <div className={styles.user_menu}>
                                    <ul>
                                        <li>
                                           
                                                <Image src='/icon/order.svg' width={14} height={14} alt='order'/>
                                            
                                            <span>My Order</span>
                                        </li>
                                        <li>
                                            
                                                <Image src='/icon/payment.svg' width={14} height={14} alt='order'/>
                                            
                                            <span>Payment</span>
                                        </li>
                                        <li>
                                           
                                                <Image src='/icon/heart.svg' width={14} height={14} alt='order'/>
                                            
                                            <span>Wish List</span>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                             <Image src='/icon/order.svg' width={14} height={14} alt='order'/>
                                            <span>Logout</span>
                                            
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            </Link>
                            
                        </label>

                        <input type="radio" name="radio-side-menu" id="contact" className={styles.radio__side__menu} />
                        <label htmlFor="contact">
                            <li>
                                Contact
                            </li>
                        </label>
                    </ul>
                </div>
                <div className={styles.icon}>
                    <Link href={`/cart/${userId}`}>
                    <Image
                        src={'/icon/cart.svg'}
                        width={32}
                        height={30.55}
                        alt='cart'
                    ></Image>
                    </Link>
                    
                </div>
            </div>
        </header>
    )
}
