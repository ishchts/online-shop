import DeleteIcon from '@mui/icons-material/Delete';
import { Card, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const CartItem = (props) => {
  return (
    <Card sx={{ mb: 2 }}>
      <Grid container>
        <Grid size={{ xs: 12, sm: 10 }}>
          <Typography variant="h6">{props.name}</Typography>
          <Typography>{props.description}</Typography>
          <Typography>Цена: {props.price}</Typography>
          <Typography>Количество: {props.quantity}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 1 }} offset={1}>
          <IconButton onClick={props.onDelete}>
            <DeleteIcon color="action" />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};
