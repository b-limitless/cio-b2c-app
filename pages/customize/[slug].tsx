import React from 'react';
import { useRouter } from 'next/router';
import Header from 'components/Header/Header';
import { productNavigation } from 'config/product';

export default function Customize() {
  const router = useRouter();

  return (
    <div className="styles container">
        <Header navigations={productNavigation} showNavigation/>
    </div>
  )
}
