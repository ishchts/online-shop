import { useEffect } from 'react';

export default function ProductsPage() {
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/v1/products');
      console.log('products', await res.json());
    })();
  }, []);

  return 'products';
}
