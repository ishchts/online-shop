import {
  Button,
  Card,
  Typography,
  CardActions,
  CardContent,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const getProducts = async () => {
  const res = await fetch('/api/v1/products');
  const json = await res.json();
  return json;
};

const addCart = async ({ productId, quantity }) => {
  const res = await fetch('/api/v1/cart', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      product_id: productId,
      quantity,
    }),
  });

  return await res.json();
};

export function getMeta() {
  return {
    title: 'Welcome to @fastify/react!',
  };
}

export default function Index() {
  const queryClient = useQueryClient();

  const { isLoading, data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const addCartMutation = useMutation({
    mutationFn: addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  if (isLoading) {
    return null;
  }

  const handleAddCart = (item) => () => {
    addCartMutation.mutate({ productId: item.id, quantity: 1 });
  };

  return (
    <Grid container sx={{ mt: 2, mb: 2 }} columnSpacing={2} rowSpacing={2}>
      {products.results.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {item.name}
              </Typography>
              <Typography variant="body1">
                <Box
                  component="span"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    height: '51px',
                  }}
                >
                  {item.description}
                </Box>
              </Typography>
              <Typography variant="subtitle1">
                Цена{' '}
                {Intl.NumberFormat('ru', {
                  currency: 'RUB',
                  style: 'currency',
                  currencyDisplay: 'symbol',
                }).format(item.price)}
              </Typography>
              <Typography variant="subtitle1">
                Наличие {item.stock} шт.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                fullWidth={true}
                size="small"
                onClick={handleAddCart(item)}
              >
                Добавить в корзину
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
