import { Model } from 'objection';

import { Products } from './Products.js';

export class OrderItems extends Model {
  static get tableName() {
    return 'order_items';
  }
  static get relationMappings() {
    return {
      product: {
        modelClass: Products,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'order_items.product_id',
          to: 'products.id',
        },
      },
    };
  }
}
