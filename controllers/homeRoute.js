const router = require('express').Router();
const { User, Product, Inventory } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', (req, res) => {
    if (req.session.user_id !== undefined) {
        Inventory.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['inventory_id', 'product_id', 'user_id', 'favorite'],
            include: [
                {
                    model: Product,
                    required: true,
                    attributes: [
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
        })
            .then((inventoryData) => {
                const inventory = inventoryData.map((inventory) =>
                    inventory.get({ plain: true })
                );
                console.log(inventory);
                // console.log(inventory[14].liquors);
                const resObj = { inventory };
                if (req.session.loggedIn) {
                    resObj.loggedIn = true;
                    resObj.username = req.session.username;
                    resObj.uid = req.session.user_id;
                }

                res.render('home', resObj);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });

    } else {
        res.render('home', {
            loggedIn: false,
        });
    }
});



router.get("/login", (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }
  
    res.render("login");
  });
  
  router.get("/signup", (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }
  
    res.render("signup"); // render signup.handlebars
  });
  
  module.exports = router;
