const ShoppingListService = {
  getAll(knex) {
    return knex.from('shopping_list').select('*');
  },
  getById(knex, id) {
    return knex.from('shopping_list').select('*').where('id', id).first();
  },
  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  updateItem(knex, id, itemField) {
    return knex('shopping_list')
      .where({ id })
      .update(itemField);
  },

  deleteItem(knex, id,) {
    return knex('shopping_list')
      .where({ id })
      .delete();
  },
};

module.exports = ShoppingListService;