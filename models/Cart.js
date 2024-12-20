import { Model } from 'objection';

import { CartItems } from './CartItems.js';

export class Cart extends Model {
  static get tableName() {
    return 'cart';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        user_id: { type: ['integer', 'null'] },
        session_id: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: CartItems,
        join: {
          from: 'cart.id',
          to: 'cart_items.cart_id',
        },
      },
    };
  }
}
