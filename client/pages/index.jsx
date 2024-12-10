import { Input, Button, Link, Card, Typography } from "@mui/material"
export function getMeta () {
  return {
    title: 'Welcome to @fastify/react!'
  }
}

export default function Index () {
  const message = 'Welcome to @fastify/react!'
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
  )
}
