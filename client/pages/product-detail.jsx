import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const path = '/products/:id';

export default function ProductDetail() {
  const params = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`/api/v1/products/${params.id}`);
      console.log('peoduct detail', await res.json());
    };

    getProduct();
  }, [params.id]);

  return 'ProductDetail';
}
