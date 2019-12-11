/* eslint-disable indent */
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
      const secondTestItem = {
        name: 'insert test',
        price: 99.99,
        date_added: new Date('2020-01-01T00:00:00.000Z'),
        checked: false,
        category: 'Lunch'
      }

      return ShoppingListService.insertItem(db, secondTestItem)
              .then(result => {
                expect(result).to.eql({
                  id: 1,
                  name: secondTestItem.name,
                  price: secondTestItem.price,
                  date_added: secondTestItem.date_added,
                  checked: secondTestItem.checked,
                  category: secondTestItem.category
                });
              });

    });

    it('updateItem() updates an item from the \'shopping_list\' table', () => {
      const secondID = 2;
      const testFields = {
        price: 0.50,
        date_added: new Date(),
        checked: true,
        category: 'Main'
      }

      return ShoppingListService.updateItem(db, secondID, testFields) 
          .then(() => ShoppingListService.getById(db, secondID))
          .then(result => {
            expect(result).to.eql({
              id: secondID,
              ...testFields,
            })
          })
    });

    it('deleteItem() removes an item by id from the \'shopping_list\' table', () => {
      const secondID = 2
      return ShoppingListService.deleteItem(db, secondID)
          .then(() => ShoppingListService.getAll(db))
          .then(results => {
            const expected = testItems.filter(item => item.id !== secondId);
            expect(results).to.eql(expected)
          });

    });
  });
});