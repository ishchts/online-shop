import { useEffect } from 'react';

export default function OrdersPage() {
  useEffect(() => {
    // const getOrders = async () => {
    //   const res = await fetch('/api/v1/orders');
    //   const json = await res.json();
    //   console.log('json', json);
    // };

    // getOrders();
    // const createOrders = async () => {
    //   const res = await fetch('/api/v1/orders', {
    //     method: 'POST',
    //   });
    //   const json = await res.json();
    //   console.log('json', json);
    // };

    // createOrders();
    // const getOrderById = async () => {
    //   const res = await fetch('/api/v1/orders/4');
    //   const json = await res.json();
    //   console.log('json', json);
    // };
    // getOrderById();
    // const updateOrderStatusById = async () => {
    //   const res = await fetch('/api/v1/orders/4/status', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'PATCH',
    //     body: JSON.stringify({ status: 'paid' }),
    //   });
    //   const json = await res.json();
    //   console.log('json', json);
    // };
    // updateOrderStatusById();
  }, []);

  return 'orders';
}
