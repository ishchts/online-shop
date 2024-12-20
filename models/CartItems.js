import { Model } from 'objection';

import { Products } from './Products.js';

export class CartItems extends Model {
  static get tableName() {
    return 'cart_items';
  }

  static get relationMappings() {
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: 'cart_items.product_id',
          to: 'products.id',
        },
      },
    };
  }
}
