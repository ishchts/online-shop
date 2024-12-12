import { Model } from 'objection';

export class OrderItems extends Model {
  static get tableName() {
    return 'order_items';
  }
}
