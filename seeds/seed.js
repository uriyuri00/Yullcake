const sequelize = require('../config/connection');
const { User, Inventory, Product } = require('../models');

const userData = require('./userData.json');
const productData = require('./productData.json');
const inventoryData = require('./inventoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, { // used to create murtiple user records
    individualHooks: true, // option indicates that any defined Sequelize hooks for the User model will be excuted for each user record
    returning: true,// while option specifies that the created records should be returned as an array. 생성자 레코드를 배열로 반환하도록 지정
  });

  for (const product of productData) { // for loop is uesd to create multiple product records basned on 'productData' array
    await Product.create({ // create multiple product record with the spread operator('...')
      ...product,
      user_id: users[Math.floor(Math.random() * users.length)].id,// user id ' property set to a random userID obtained from the 'users' array using math.floor expression
    });
  }

  process.exit(0);
};

seedDatabase();
