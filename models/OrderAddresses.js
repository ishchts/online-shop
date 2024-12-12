import { Model } from 'objection';

export class OrderAddresses extends Model {
  static get tableName() {
    return 'order_addresses';
  }
}
