const router = require('express').Router();
const { User, Product, Inventory } = require("../../models");
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
    const productData = await Product.findAll({
        attributes: ['product_id', 'name', 'price', 'type'],
    })
            res.status(200).json(productData);
        

    }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});

router.get('/:id', async (req, res) => {
    try {
    const productData = await Product.findOne({
        where: { product_id: req.params.id},
        attributes: ['product_id', 'name', 'price', 'type'],
    })
            res.status(200).json(productData);
        

    }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});

// post product
router.post('/', withAuth, (req, res) => {
    Product.create({
        name: req.body.name,
        description: req.body.description,
        user_id: req.session.user_id,
    })
        .then((productData) => res.json(productData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete product
router.delete('/:id', withAuth, (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((productData) => {
            if (!productData) {
                res.status(404).json({
                    message: 'No product found with this id!',
                });
                return;
            }
            res.json(productData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
module.exports = router;
