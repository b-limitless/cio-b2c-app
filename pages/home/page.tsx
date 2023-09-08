'use client';
import React from 'react';
import styles from './home.module.scss';
import Header from 'components/Header/Header';
import Image from 'next/image';
import { Button } from 'components/Button';
import { ClientInteraction, CheckboxWithLabel } from '@pasal/cio-component-library';
import Link from 'next/link';

export default function Home() {
    return (
        <>
       {/* <ClientInteraction/> */}
       
        <div className={styles.page__container}>
            <Header showNavigation/>
            <div className={styles.mid__content}>
                <div className={styles.col}>
                    <div className={styles.contents}>
                        <div className={styles.heading}>
                            <div className={styles.normal}>
                                Made to Measure
                            </div>
                            <div className={styles.bold}>
                                that fit you perfectly
                            </div>
                        </div>

                        <div className={styles.description}>
                            Shirts that fit you perfectly. Choose a custom dress shirt designed by you. Make a statement with a made to measure shirt perfect for any occasions, whether it {'\\'} s business or casual we will tailor the perfect men s dress shirt for you. Buy the best custom dress shirt online.
                        </div>

                        <Link href="/customize/shirt">

                        <Button variant='primary' type='round'>
                            <span>Design shirt</span>
                            <span>
                                <Image width={7} height={12} src="/icon/arrow-right-bold.svg" alt="" />
                            </span>
                        </Button>
                        </Link>
                        


                    </div>
                </div>
                <div className={styles.col}>
                    <Image src="/img/man.png" alt="" width={300} height={816.5} />
                </div>
            </div>

        </div>
        </>
        
    )
}
