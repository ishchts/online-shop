import { Model } from 'objection';

export class Products extends Model {
  static get tableName() {
    return 'products';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'price', 'stock'],
      properties: {
        id: { type: 'integer' },
        catalog_id: { type: ['integer', 'null'] },
        name: { type: 'string' },
        description: { type: ['string', 'null'] },
        price: { type: 'number' },
        stock: { type: 'integer' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}
