import { Model } from 'objection';

export class Catalogs extends Model {
  static get tableName() {
    return 'catalogs';
  }
}
