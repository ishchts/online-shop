import { Model } from 'objection';

import { OrderItems } from './OrderItems.js';

export class Orders extends Model {
  static get tableName() {
    return 'orders';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['status', 'total_price'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: ['integer', 'null'] },
        status: {
          type: 'string',
          enum: ['new', 'paid', 'shipped', 'completed', 'canceled'],
        },
        total_price: { type: 'number' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }
  static get relationMappings() {
    return {
      items: {
        modelClass: OrderItems,
        relation: Model.HasManyRelation,
        join: {
          from: 'orders.id',
          to: 'order_items.id',
        },
      },
    };
  }
}
