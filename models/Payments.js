import { Model } from 'objection';

export class Payments extends Model {
  static get tableName() {
    return 'payments';
  }
}
