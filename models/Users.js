import { Model } from 'objection';

export class Users extends Model {
  static get tableName() {
    return 'users';
  }
}
