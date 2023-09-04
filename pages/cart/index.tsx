'use client'
import React from 'react';
import Header from 'components/Header/Header';
import styles from './cart.module.scss';
import Image from 'next/image';
import { Button } from 'components/Button';

// cart-shirt, add, copy, eye, delete, hunburg
export default function Cart() {
  return (
    <>
      <Header />
      <div className={styles.cart__container}>
        <div className={styles.title}>Shopping Bag</div>

        <div className={styles.cart__details}>
          <div className={styles.items}>
            <div className={styles.row}>
              <div className={styles.media}>
                <Image src={'/img/cart-shirt.png'} width={140} height={176.83} alt='' />
              </div>
              <div className={styles.description}>
                <div className={styles.group}>
                  <div className={styles.name}>
                    TAILORED SHIRT(X 2)
                  </div>
                  <div className={styles.type}>
                    COTTON, BLUE
                  </div>
                </div>
                <div className={styles.group}>
                  <div className={styles.price}>
                    $152
                  </div>
                  <div className={styles.delivery}>
                    Delivery in 6 Weeks
                  </div>
                </div>
                <div className={styles.group}>
                  <div className={styles.modify}>Modify</div>
                </div>
              </div>
              <div className={styles.actions}>
                Actions
              </div>
            </div>
          </div>
          <div className={styles.summary}>
            <div className={styles.summary__details}>
              <div className={styles.row}>
                <div className={styles.title}>
                  <span className={styles.dark__text}>
                    4 products at value of $309
                  </span>
                  <span className={styles.green__text}>
                    Free shipping
                  </span>
                </div>
                <div className={styles.gray__text}>fig
                  Your order will be sent grouped in different packages,
                  the delivery time is specified under for each product
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.tr}>
                  <div className={styles.label}>Shopping bag total</div>
                  <div className={styles.price}>$309</div>
                </div>
                <div className={styles.tr}>
                  <div className={styles.label}>Shipping</div>
                  <div className={`${styles.shipping__cost} ${styles.free}`}>Free</div>
                </div>

                <div className={styles.tr}>
                  <div className={styles.total}>Total</div>
                  <div className={styles.total__cost}>$309</div>
                </div>

                <div className={styles.tr}>
                  <Button variant='primary' type='square'>
                    <Image src={'/icon/rular.svg'} width={30} height={30} alt=''/>
                    <span>MEASUREMENT AND CHECKOUT</span>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>

  )
}
