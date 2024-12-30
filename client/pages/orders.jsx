import { Card, Typography, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useQuery } from '@tanstack/react-query';
const getOrders = async () => {
  const res = await fetch('/api/v1/orders');
  const json = await res.json();
  return json;
};

export default function OrdersPage() {
  const { isLoading, data: orders } = useQuery({
    queryFn: getOrders,
    queryKey: ['orders'],
  });

  if (isLoading) {
    return null;
  }

  return (
    <Grid container sx={{ mt: 2, mb: 2 }} spacing={2}>
      {orders.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {item.status}
              </Typography>
              <Typography variant="subtitle1">
                Цена{' '}
                {Intl.NumberFormat('ru', {
                  currency: 'RUB',
                  style: 'currency',
                  currencyDisplay: 'symbol',
                }).format(item.total_price)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
