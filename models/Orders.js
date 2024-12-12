import { Model } from 'objection';

export class Orders extends Model {
  static get tableName() {
    return 'orders';
  }
}
