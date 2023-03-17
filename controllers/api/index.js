const router = require('express').Router();

const userRoute = require('./userRoutes');
const inventoryRoute = require('./inventoryRoute');
const productsRoute = require('./productsRoute');


router.use('/users', userRoute);
router.use('/products', productsRoute);
router.use('/inventory', inventoryRoute);

//catch-all route for any resource that does not exist
// router.use((req,res) => {
//     res.status(404).end();
// });

module.exports = router; 