// 'use client'
import { Button } from 'components/Button';
import Header from 'components/Header/Header';
import { moneyFormat } from 'functions/moneyFormat';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllAccent } from 'slices/accentSlice';
import { ICartItem, IUpdateBase, IUpdateQuantity, deleteItemAction, duplicateItem, updateQuantity } from 'slices/cartSlice';
import { updateFebric } from 'slices/febricSlice';
import { updateAllProps } from 'slices/modelSlice';
import { updateCartIndexAction } from 'slices/updateCartIndex';
import { RootState } from 'store';
import styles from './cart.module.scss';
import Model from './model';
import CartItem from './CartItem';
import { APIS } from 'config/apis';
import { request } from 'utils/request';



interface ICartMain {
    userId: string | string[]
}
// cart-shirt, add, copy, eye, delete, hunburg
export default function Cart({userId}: ICartMain) {
  const [showCartDetailsModel, setShowCartDetailsModel] = useState<number>(-1);
  const [selectedCartIndex, setSelectedCartIndex] = useState<null | number>(null);
  const carts = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  // for the testing lets dispatch the cart
  useEffect(() => {
    const dispatchSampleCartData = () => {
      // dispatch(addToCart(cartSameDate[0] as any));
      // dispatch(addToCart(cartSameDate[1] as any));
      // dispatch(addToCart(cartSameDate[2] as any));
    }
    dispatchSampleCartData();
  }, [dispatch]);

  const addOrRemoveHanlder = async(params: IUpdateQuantity) => {
    const {addOrRemove, qty, index, id} = params
  
    const finalQty = addOrRemove === 'add' ? carts[index].qty + 1 : carts[index].qty - qty;

    try {
        await request({
          url: `${APIS.cart}/${id}`,
          method: 'patch', 
          body: {qty: finalQty}
        });
    } catch(err) {
      console.error(`Could not update quanity ${err}`);
      throw new Error(`Could not update quanity ${err}`);
    }
    dispatch(updateQuantity(params));
  }

  const duplicateCartItem = async(params: IUpdateBase) => {
    // Get cart by index and remove the id from it and sent creat cart API 
    const {index} = params;

    const copyCart = carts[index];
    const {id, ...body} = copyCart;

    try {
      await request({
        url: APIS.cart,
        method: 'post', 
        body
      });
    } catch(err) {
      console.log(`Could be duplicate the cart ${err}`);
    }
    dispatch(duplicateItem(params));
  }

  const deleteItem = async(params: IUpdateBase) => {

    // Send the request to the server to delete the item
    const{index} = params;
    try {
       await request({url: `${APIS.cart}/${index}`, method: 'delete'})
    } catch(err) {
      console.error(`could not delete the item ${err}`)
    }
    dispatch(deleteItemAction(params))
  }

  const getCartDetails = () => {
    // We are setting to index + 1 
    // To access we have to subtract from thevalue 
    if (showCartDetailsModel > 0) {
      const index = showCartDetailsModel - 1;
      console.log(carts[index]);
    }
  }

  const getQty = useMemo(() => {
    if (carts.length < 1) return null;
    return carts.map((cart) => cart.qty).reduce((a: number, b: number) => a + b)
  }, [carts])

  const totalAmount = useMemo(() => {
    if (carts.length < 1) return null;
    const amount = carts.map((cart) => cart.subTotal).reduce((a: number, b: number) => a + b);
    return moneyFormat().format(amount);

  }, [carts]);

  const cartIndexToUpdate = (index: number) => {
    const {model, accent, febric}  = carts[index];
    dispatch(updateCartIndexAction(index));
    
    dispatch(updateAllProps(model));
    dispatch(updateAllAccent(accent));
    dispatch(updateFebric(febric));

    router.push(`/customize/shirt/${userId}`);

  }

  return (
    <>
      <Model
        show={showCartDetailsModel}
        setShow={setShowCartDetailsModel}
        setSelectedCartIndex={setSelectedCartIndex}
        cart={carts[showCartDetailsModel - 1] ?? null}
      />
      <Header userId={userId}/>
      <div className={styles.cart__container}>
        <div className={styles.title}>
          <Link href={`/customize/shirt/${userId}`}>Shopping Bag</Link>
          </div>

        {carts.length > 0 && <div className={styles.cart__details}>
          <div className={styles.items}>
            {carts.map((cart, i) => <CartItem
              key={'cart-item' + i}
              id={i}
              cart={cart}
              addOrRemoveHanlder={addOrRemoveHanlder}
              duplicateCartItem={duplicateCartItem}
              deleteItem={deleteItem}
              setShowCartDetailsModel={setShowCartDetailsModel}
              cartIndexToUpdate={cartIndexToUpdate}
            />

            )}

          </div>
          <div className={styles.summary}>
            <div className={styles.summary__details}>
              <div className={styles.row}>
                <div className={styles.title}>
                  <span className={styles.dark__text}>
                    {getQty} products at value of {totalAmount}
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
                  <div className={styles.price}>{totalAmount}</div>
                </div>
                <div className={styles.tr}>
                  <div className={styles.label}>Shipping</div>
                  <div className={`${styles.shipping__cost} ${styles.free}`}>Free</div>
                </div>

                <div className={styles.tr}>
                  <div className={styles.total}>Total</div>
                  <div className={styles.total__cost}>{totalAmount}</div>
                </div>

                <div className={styles.tr}>
                  <Link href={`/order/${userId}`}>
                  <Button variant='primary' type='square'>
                    <Image src={'/icon/rular.svg'} width={30} height={30} alt='' />
                    <span>MEASUREMENT AND CHECKOUT</span>
                  </Button>
                  </Link>
                  
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
