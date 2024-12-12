import { Model } from 'objection';

export class Cart extends Model {
  static get tableName() {
    return 'cart';
  }
}
