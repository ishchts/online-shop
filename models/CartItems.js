import { Model } from 'objection';

export class CartItems extends Model {
  static get tableName() {
    return 'cart_items';
  }
}
