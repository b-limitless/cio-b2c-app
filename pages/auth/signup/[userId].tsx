import { useRouter } from 'next/router'
import React from 'react'
import Main from './Main';

export default function Signup() {
  const router = useRouter();
  const {userId} = router.query;

  return (
    <Main userId={userId ?? ''}/>
  )
}
