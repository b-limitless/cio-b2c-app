import React from 'react'
import CustomizeMain from './CustomizeMain'
import { useRouter } from 'next/router'

export default function CustomizeRouteBaseUserId() {
  const router = useRouter();
  const {userId} = router.query;
  return (
    <CustomizeMain userId={userId ?? ''}/>
  )
}
