import React from 'react'
import Cart from './CartMain'
import { storeID } from 'config/user'
import Header from 'components/Header/Header'

export default function CartHardCodedUserId() {
  return (
    <Cart userId={storeID}>
       <Header userId={storeID} />
    </Cart>
  )
}
