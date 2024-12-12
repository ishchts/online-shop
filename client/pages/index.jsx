import { Input, Button, Link, Card, Typography } from '@mui/material';
import { useEffect } from 'react';

export function getMeta() {
  return {
    title: 'Welcome to @fastify/react!',
  };
}

export default function Index() {
  const message = 'Welcome to @fastify/react!';

  useEffect(() => {
    fetch('/api/v1/products')
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res);
      });
  }, []);
  return (
    <>
      <Input placeholder="input" />
      <Button>Button</Button>
      <Button variant="contained">Button</Button>
      <Link>Link</Link>
      <p>{message}</p>
      <Card>
        <Typography variant="h5" gutterBottom>
          Карточка с заголовком
        </Typography>
        <Typography variant="body1">
          Это пример содержимого внутри карточки.
        </Typography>
      </Card>
    </>
  );
}
