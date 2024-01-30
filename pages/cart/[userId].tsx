import React from 'react'
import Cart from './CartMain'
import { useRouter } from 'next/router'

export default function CartRouteBaseUserId() {
  const router = useRouter();
  const {userId} = router.query;

  return (
    <Cart userId={userId ?? ''}/>
  )
}
