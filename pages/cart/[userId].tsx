import React from 'react'
import Cart from './CartMain'
import { useRouter } from 'next/router'
import Header from 'components/Header/Header';

export default function CartRouteBaseUserId() {
  const router = useRouter();
  const {userId} = router.query;

  return (
    <Cart userId={userId ?? ''}>
       <Header userId={userId ?? ''} />
    </Cart>
  )
}
