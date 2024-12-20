import { Model } from 'objection';

export class Users extends Model {
  static get tableName() {
    return 'users';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password_hash', 'role'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        phone: { type: ['string', 'null'] },
        password_hash: { type: 'string' },
        role: { type: 'string', enum: ['customer', 'admin', 'manager'] },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}
