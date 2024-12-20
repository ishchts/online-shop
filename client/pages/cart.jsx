import { useEffect } from 'react';

export default function Cart() {
  useEffect(() => {
    // const addCart = async () => {
    //   const res = await fetch('/api/v1/cart', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({
    //       product_id: 2,
    //       quantity: 4,
    //     }),
    //   });
    //   console.log('res', await res.json());
    // };

    // addCart();
    // const deleteCart = async () => {
    //   const res = await fetch('/api/v1/cart/2', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'DELETE',
    //   });
    //   console.log('res', await res.json());
    // };

    // deleteCart();
  }, []);

  return 'cart';
}
