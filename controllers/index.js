const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoute = require('./homeRoute');


router.use('./api', apiRoutes);
router.use('/', homeRoute);

//catch-all route for any resource that does not exist
router.use((req,res) => {
    res.status(404).end();
});

module.exports = router; 