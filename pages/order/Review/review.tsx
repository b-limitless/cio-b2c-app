import { storeID } from 'config/user';
import Cart from 'pages/cart/CartMain';
import React from 'react';
import { OrderCommonInterface } from 'types/common.interface';

export default function Review({userId, setMeasurementJourney}: OrderCommonInterface) {

  return (
    <Cart 
      userId={userId ?? ''} 
      usedFrom='review'
      setMeasurementJourney={setMeasurementJourney}
      >
      
    </Cart>
  )
}