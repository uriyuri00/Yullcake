

const User = require('./User'); 
const Product = require('./Product');
const Inventory = require('./Inventory');


User.hasone(Inventory, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


User.hasMany(Product, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Product.belongsTo(User, {
  foreignKey: 'user_id'

});

Inventory.belongsTo(User, {
  foreignKey: 'user_id'
});

Inventory.belongsTo(Product, {
  foreignKey: 'user_id'
});




module.exports = { User, Product, Inventory };
