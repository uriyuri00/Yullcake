const router = require('express').Router();
const { User, Product, Inventory } = require("../../models");
const withAuth = require('../../utils/auth');

// get all products
router.get('/:favorites', withAuth, async (req, res) => {
    try {
        if (req.params.favorites) {
            const inventoryData = await Inventory.findAll({
                where: {
                    favorite: true,
                    user_id: req.session.user_id,
                },
                attributes: ['inventory_id', 'product_id', 'user_id', 'favorite'],
                include: [
                    {
                        model: Product,
                        attributes: [
                            'product_id',
                            'name',
                            'description',
                            'type',
                            'volume',
                            'image',
                        ],
                    },
                ],
            });
            res.json(inventoryData);
        } else {
            const inventoryData = await Inventory.findAll({
                where: {
                    user_id: req.session.user_id,
                },
                attributes: ['inventory_id', 'product_id', 'user_id', 'favorite'],
                include: [
                    {
                        model: Product,
                        attributes: [
                            'product_id',
                            'name',
                            'description',
                            'price',
                            'image',
                        ],
                    },
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
            });
            res.json(inventoryData);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;
