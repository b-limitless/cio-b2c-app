'use client'
import React from 'react';
import Header from 'components/Header/Header';
import styles from './cart.module.scss';
import Image from 'next/image';
import { Button } from 'components/Button';

interface CartInterface {
  id: number;
}
const CartItem = ({id}: CartInterface) => {
  return <div className={styles.row}>
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
      <label className={styles.humburger} htmlFor={`cart-item-key-${id}`}>
        <Image src='/icon/humburg.svg' width={20} height={20} alt='menu' />
      </label>
      <input type="checkbox" name="" id= {`cart-item-key-${id}`} hidden className={styles.menu__checkbox} />

      <div className={styles.menu}>
        <ul>
          <li>
            <span className={styles.icon}><Image src='/icon/add.svg' width={20} height={20} alt='menu' /></span>
            <span className={styles.text}>Add/Remove</span>
          </li>
          <li>
            <span className={styles.icon}><Image src='/icon/copy.svg' width={20} height={20} alt='menu' /></span>
            <span className={styles.text}>Duplicate</span>
          </li>
          <li>
            <span className={styles.icon}><Image src='/icon/eye.svg' width={20} height={20} alt='menu' /></span>
            <span className={styles.text}>View</span>
          </li>
          <li>
            <span className={styles.icon}><Image src='/icon/delete.svg' width={20} height={20} alt='menu' /></span>
            <span className={styles.text}>Delete</span>
          </li>
        </ul>
      </div>

    </div>
  </div>;
}

const countNum = new Array(10).fill(0);


// cart-shirt, add, copy, eye, delete, hunburg
export default function Cart() {
  // console.log(window.innerHeight)
  // console.log(window.document.body.scrollHeight)
  return (
    <>
      <Header />
      <div className={styles.cart__container}>
        <div className={styles.title}>Shopping Bag</div>

        <div className={styles.cart__details}>
          <div className={styles.items}>
            {countNum.map((_, i) => <CartItem key={i} id={i}/>)}
            
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
                <div className={styles.gray__text}>
                  <p>
                    Your order will be sent grouped in different packages,
                    the delivery time is specified under for each product
                  </p>

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
                    <Image src={'/icon/rular.svg'} width={30} height={30} alt='' />
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
