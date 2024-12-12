import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const LinkBehavior = forwardRef(function LinkBehavior(props, ref) {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});
