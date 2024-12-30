import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { CartItem } from '../components/CartItem';

function generateUUID4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const createOrder = async () => {
  const res = await fetch('/api/v1/orders', {
    method: 'POST',
  });
  const json = await res.json();
  return json;
};

const handleCreateOrder = async () => {
  const uuid = generateUUID4();
  const { order_id } = await createOrder();
  const createPayment = async () => {
    const res = await fetch('/api/v1/payments', {
      method: 'POST',
      headers: {
        'Idempotence-Key': uuid,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: 'Заказ №1.1',
        return_url: window.location.origin + '/orders?pay=true',
        order_id,
      }),
    });

    const json = await res.json();
    return json;
  };

  const res = await createPayment();
  console.log('json', res);
  if (res?.confirmation?.confirmation_url) {
    window.location.href = res?.confirmation?.confirmation_url;
  }
};

const getCart = async () => {
  const res = await fetch('/api/v1/cart', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
};

const deleteCart = async ({ id }) => {
  const res = await fetch(`/api/v1/cart/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
  return await res.json();
};

export default function Cart() {
  const queryClient = useQueryClient();

  const { isLoading, data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const deleteCartMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <Grid container sx={{ mt: 2, mb: 2 }} spacing={2}>
      <Grid size={{ xs: 12, sm: 8 }}>
        {cart.items.map((item) => (
          <CartItem
            key={item.id}
            quantity={item.quantity}
            name={item.product.name}
            description={item.product.description}
            price={item.product.price}
            onDelete={() => {
              deleteCartMutation.mutate({ id: item.product.id });
            }}
          />
        ))}
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={handleCreateOrder}
        >
          Оформить заказ за{' '}
          {Intl.NumberFormat('ru', {
            currency: 'RUB',
            style: 'currency',
          }).format(cart.total)}
        </Button>
      </Grid>
    </Grid>
  );
}
