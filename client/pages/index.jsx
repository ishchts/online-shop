import {
  Button,
  Card,
  Typography,
  CardActions,
  CardContent,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';

export function getMeta() {
  return {
    title: 'Welcome to @fastify/react!',
  };
}

export default function Index() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/v1/products');
      const json = await res.json();
      setProducts(json.results);
    })();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <Grid container sx={{ mt: 2, mb: 2 }} columnSpacing={2} rowSpacing={2}>
      {products.map((item) => (
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
              <Button variant="contained" fullWidth={true} size="small">
                Добавить в корзину
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
