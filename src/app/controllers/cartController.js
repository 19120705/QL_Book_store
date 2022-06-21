var Cart = require("../models/cart");
const cartService = require("../services/cartService");
const rulesService = require("../services/rulesService");
const {multipleSequelizeToObject,SequelizeToObject} = require('../../util/sequelize');

class cartController {
    //[GET]: /cart
    async cartList(req, res, next) {
        if (req.user) {
            try {
                const carts = await cartService.list();
                const sach = await cartService.getBooks();
                const mapns = req.params.id;
                res.render("cart/cart", {
                    carts: carts.rows, 
                    sach: multipleSequelizeToObject(sach),
                    mapns: mapns,
                });
            } catch (error) {
                next(error);
            }
        } else {
            res.redirect("/");
        }
    }
    //[POST]: /cart/add/
    async add(req, res, next) {
        try {
            if (req.user) {
                var curr_import_min = await rulesService.getCurrIMin();
                var product = await cartService.getSach(req.body.MASACH);
                if ( product.LUONGTON > curr_import_min) {
                    res.status(201).json({
                        message: "Lượng tồn của sách đang chọn đang vượt mức quy định",
                    });
                } else {
                    var cart = new Cart(
                        req.session.cart ? req.session.cart : {}
                    );
                    cart.add(product, req.body.MASACH, req.body.SOLUONG);
                    req.session.cart = cart;
                    res.redirect("/cart");
                    // res.json({ message: "Thành công!" });
                }
            } else {
                res.redirect("/");
            }
        } catch (error) {
            next(error);
        }
    }
    //[GET]:/remove/:id
    async remove(req, res, next) {
        try {
            if (req.user) {
                var productId = req.params.id;
                var cart = new Cart(req.session.cart ? req.session.cart : {});
                cart.remove(productId);
                req.session.cart = cart;
                res.redirect("/cart");
            } else {
                res.redirect("/");
            }
        } catch (error) {
            next(error);
        }
    }
    //[GET]:/update-quantity
    async update(req, res, next) {
        try {
            if (req.user) {
                var emp = req.user.LOAINV === "emp";
                var quantity = req.query.quantity;
                var id = req.query.id;
                var curr_quantity_max = await rulesService.getCurrMax();
                var curr_quantity_min = await rulesService.getCurrMin();
                var stockPr = await cartService.getquantityBook(id);
                if (emp && stockPr.SLCuoi - quantity < curr_quantity_min) {
                    res.status(201).json({
                        message: "Số lượng sách hiện tại vượt mức quy định",
                    });
                } else {
                    if (!emp && stockPr.SLCuoi > curr_quantity_max) {
                        res.status(201).json({
                            message: "Số lượng sách hiện tại vượt mức quy định",
                        });
                    } else {
                        var cart = new Cart(
                            req.session.cart ? req.session.cart : {}
                        );
                        cart.update(id, quantity);
                        req.session.cart = cart;
                        res.status(201).json({});
                    }
                }
            } else {
                res.redirect("/");
            }
        } catch (error) {
            next(error);
        }
    }
    //[GET]:/resfesh
    async resfesh(req, res, next) {
        try {
            if (req.user) {
                if (!req.session.cart) {
                    res.status(200).json({
                        title: "NodeJS Shopping Cart",
                        products: null,
                        totalPrice: 0,
                    });
                }
                var cart = new Cart(req.session.cart);
                var products = cart.getItems() ? cart.getItems() : {};
                res.status(200).json({
                    title: "NodeJS Shopping Cart",
                    products,
                    totalPrice: cart.totalPrice,
                });
            } else {
                res.redirect("/");
            }
        } catch (error) {
            next(error);
        }
    }
    //[GET]:/listUser
    async listCust(req, res, next) {
        try {
            if (req.user) {
                const list = await cartService.getlistCust();
                res.status(200).json({ list });
            } else {
                res.redirect("/");
            }
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new cartController();
