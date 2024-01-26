import React, { useEffect } from 'react';


export default function useFetchCart() {
  useEffect(() => {
    const fetchUserCart = async() => {
        try {
            // const carts = await request
        } catch(err:any) {
            throw new Error(err); 
        }
    }
  }, []);
  return null;
}
