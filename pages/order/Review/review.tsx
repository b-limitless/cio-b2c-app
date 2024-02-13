import Cart from 'pages/cart/CartMain';
import React from 'react';
import { OrderCommonInterface } from 'types/common.interface';

export default function Review({setMeasurementJourney}: OrderCommonInterface) {

  return (
    <Cart 
      userId={'345345345'} 
      usedFrom='review'
      setMeasurementJourney={setMeasurementJourney}
      >
      
    </Cart>
  )
}
