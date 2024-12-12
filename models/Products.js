import { Model } from 'objection';

export class Products extends Model {
  static get tableName() {
    return 'products';
  }
}
