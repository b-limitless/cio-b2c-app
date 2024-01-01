// 'use client'
import React, { useEffect } from 'react';
import Header from 'components/Header/Header';
import styles from './cart.module.scss';
import Image from 'next/image';
import { Button } from 'components/Button';
import { cartSameDate } from 'sample/cart';
import { useDispatch, useSelector } from 'react-redux';
import { ICart, ICartItem, IUpdateBase, IUpdateQuantity, addToCart, duplicateItem, updateQuantity, deleteItemAction } from 'slices/cartSlice';
import { RootState } from 'store';
import { moneyFormat } from 'functions/moneyFormat';

interface CartInterface {
  id: number;
  cart: ICartItem;
  addOrRemoveHanlder: (params: IUpdateQuantity) => void;
  duplicateCartItem: (params: IUpdateBase) => void;
  deleteItem: (params: IUpdateBase) => void;
}
const CartItem = ({ id, cart, addOrRemoveHanlder, duplicateCartItem, deleteItem }: CartInterface) => {
  return <div className={styles.row}>
    <div className={styles.media}>
      <Image src={cart.originalImageUrl ?? ''} width={140} height={176.83} alt='' />
    </div>
    <div className={styles.description}>
      <div className={styles.group}>
        <div className={styles.name}>
          {cart.model.febric.title} TAILORED SHIRT -  {cart.qty} {id}
        </div>
        <div className={styles.type}>
          {cart.model.febric.material} | {' '}
          {cart.model.febric.febricTypes}
        </div>

      </div>
      <div className={styles.group}>
        <div className={styles.price}>
          <>{moneyFormat().format(Number(cart.subTotal))}</>
        </div>
        <div className={styles.delivery}>
          Delivery in {cart.deliveryTime}
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
      <input type="checkbox" name="" id={`cart-item-key-${id}`} hidden className={styles.menu__checkbox} />

      <div className={styles.menu}>
        <ul>
          <li>
            <span className={styles.icon}><Image src='/icon/add.svg' width={20} height={20} alt='menu' /></span>
            <span className={styles.text}> <span onClick={() => addOrRemoveHanlder({ qty: 1, index: id, addOrRemove: 'add' })}>Add</span>/
              <span onClick={() => addOrRemoveHanlder({ qty: 1, index: id, addOrRemove: 'remove' })}>Remove</span></span>
          </li>
          <li>
            <span className={styles.icon}><Image src='/icon/copy.svg' width={20} height={20} alt='menu' /></span>
            <span className={styles.text} onClick={() => duplicateCartItem({ index: id })}>Duplicate</span>
          </li>
          <li>
            <span className={styles.icon}><Image src='/icon/eye.svg' width={20} height={20} alt='menu' /></span>
            <span className={styles.text}>View</span>
          </li>
          <li onClick={() => deleteItem({ index: cart.id })}>
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
  const carts = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  // for the testing lets dispatch the cart
  useEffect(() => {
    const dispatchSampleCartData = () => {
      dispatch(addToCart(cartSameDate[0] as any));
      dispatch(addToCart(cartSameDate[1] as any));
    }
    dispatchSampleCartData();
  }, [dispatch]);

  console.log('Mounting the component')

  const addOrRemoveHanlder = (params: IUpdateQuantity) => {
    dispatch(updateQuantity(params));
  }

  const duplicateCartItem = (params: IUpdateBase) => {
    dispatch(duplicateItem(params));
  }

  const deleteItem = (params: IUpdateBase) => {
    dispatch(deleteItemAction(params))
  }

  return (
    <>
      <Header />
      <div className={styles.cart__container}>
        <div className={styles.title}>Shopping Bag</div>

        {carts.length > 0 && <div className={styles.cart__details}>
          <div className={styles.items}>
            {carts.map((cart, i) => <CartItem
              key={'cart-item' + i}
              id={i}
              cart={cart}
              addOrRemoveHanlder={addOrRemoveHanlder}
              duplicateCartItem={duplicateCartItem}
              deleteItem={deleteItem}
            />

            )}

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
        </div>}

        {carts.length === 0 && <div className={styles.empty__cart}>
          Shopping bag is empty
        </div>}
      </div>
    </>

  )
}
