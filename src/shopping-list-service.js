const ShoppingListService = {
  getById(knex, id) {
    return knex.from('shopping_list').select('*').where('id', id).first();
  },
  insertItem() {

  },
  updateItem() {

  },
  deleteItem() {

  },
};

module.exports = ShoppingListService;