import { Button } from '@mui/material';
import { useEffect } from 'react';

function generateUUID4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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

  const handleClick = async () => {
    const uuid = generateUUID4();
    const createOrder = async () => {
      const res = await fetch('/api/v1/payments', {
        method: 'POST',
        headers: {
          'Idempotence-Key': uuid,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: 'Заказ №1.1',
          return_url: window.location.origin + '/orders?pay=true',
        }),
      });

      const json = await res.json();
      return json;
    };

    const res = await createOrder();
    console.log('json', res);
    if (res?.confirmation?.confirmation_url) {
      window.location.href = res?.confirmation?.confirmation_url;
    }
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Оплатить
    </Button>
  );
}
