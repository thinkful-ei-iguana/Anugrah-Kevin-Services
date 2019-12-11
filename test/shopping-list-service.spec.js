const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping list service object', function() {
  let db;
  let testItems = [ {
    id: 1,
    name: 'Salami for cats',
    price: 3.50,
    date_added: new Date('1919-12-22T16:28:32.615Z'),
    checked: false,
    category: 'Main'
  },
  {
    id: 2,
    name: 'Fish for dogs',
    price: 1,
    date_added: new Date('2029-01-22T16:28:32.615Z'),
    checked: true,
    category: 'Snack',
  }
  ];

  before(() => db('shopping_list').truncate());

  afterEach(() => db('blogful_articles').truncate());

  after(() => db.destroy());

  context('\'shopping_list\' contains items', () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems);
    });

    it('getById() returns an item by id from \'shopping_list', () => {
      const secondId = 2;
      const secondTestItem = testItems[secondId - 1];
      return ShoppingListService.getById(db, secondId)
        .then(actual => {
          expect(actual).to.eql({
            id: secondId,
            name: secondTestItem.name,
            price: secondTestItem.price,
            date_added: secondTestItem.date_added,
            checked: secondTestItem.checked,
            category: secondTestItem.category,
          });
        });
    });

    it('insertItem() returns a new item and resolves the new item with id', () => {

    });

    it('updateItem() updates an item from the \'shopping_list\' table', () => {

    });

    it('deleteItem() removes an item by id from the \'shopping_list\' table', () => {

    });
  });
});