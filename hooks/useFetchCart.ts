import axios from 'axios';
import { APIS } from 'config/apis';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from 'slices/cartSlice';
import { request } from 'utils/request';


export default function useFetchCart() {
  const dipsatch = useDispatch();
  useEffect(() => {
    const fetchUserCart = async() => {
        try {
            const carts = await request({
                method:'get', 
                url: 'http://localhost:8000/api/cart'
            });
            // const carts = await axios.get('http://localhost:8000/api/cart', {withCredentials: true});

            // const body = carts.data;

            // if(body.length > 0) {
            //     dipsatch(addToCart({...body[0]}));
            // }
            
        } catch(err:any) {
            console.error(err); 
        }
    }
    fetchUserCart();
  }, []);
  return null;
}
