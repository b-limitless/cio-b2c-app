'use client';
import { Button } from 'components/Button';
import Header from 'components/Header/Header';
import Image from 'next/image';
import Link from 'next/link';
import styles from './home/home.module.scss';
import { useDispatch } from 'react-redux';
import { updaetModelType } from 'slices/modelTypeSlice';
import { storeID } from 'config/user';
import { updateStoreIdAction } from 'slices/storeSlice';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';


function Home() {
    const dispatch = useDispatch();

    const actionButtonHandler = () => {
        dispatch(updaetModelType('shirt'));
        dispatch(updateStoreIdAction(storeID));
    }

    useEffect(() => {
        const gettingCookie = async() => {

            //
            try {
                await axios.post('http://localhost:8000/api/cart/currentCartSession', {}, {
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    withCredentials: true
                  })
                // // 
                //const sessionId = cookieHeader && cookieHeader?.split(';')[0];

                
            } catch(err) {
                console.error('could not fetvh', err)
            }
        }

        const setttingcookie = async() => {
            try {
                await axios.post('http://localhost:8000/api/cart/setCartSession', {}, {
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    withCredentials: true
                  })
                
            } catch(err) {
                console.error('could not fetvh', err)
            }
        }

        const fetchCart = async() => {
            try {
                // await axios.post('http://localhost:8000/api/cart', {}, {
                //     headers: {
                //       'Content-Type': 'application/json'
                //     },
                //     withCredentials: true
                //   })

                await axios.get('http://localhost:8000/api/cart', {withCredentials: true});
                
            } catch(err) {
                console.error('could not fetvh', err)
            }
        }


        //


        fetchCart()
        // setttingcookie();
        // gettingCookie();
        
    }, [])

    console.log('sdfsdf')
    return (
        <>
            <div className={styles.page__container}>
                <Header showNavigation />
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

                            <Link href={`/customize/shirt/${storeID}`}>

                                <Button variant='primary' type='round' onClick={actionButtonHandler}>
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


export default dynamic(() => Promise.resolve(Home), { ssr: false });
