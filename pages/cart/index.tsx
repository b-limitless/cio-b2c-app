import React from 'react'
import Cart from './CartMain'
import { storeID } from 'config/user'

export default function CartHardCodedUserId() {
  return (
    <Cart userId={storeID}/>
  )
}
