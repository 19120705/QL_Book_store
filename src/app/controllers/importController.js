const importService = require("../services/importService");
const pagination = require("../../public/js/pages/pagination");
const rules = require("../services/rulesService"); 

class orderController {
    //[GET]: /products/
    async list(req, res, next) {
        if (req.user) {
            if (req.user.LOAINV != "emp") {
                let chooseMonth = req.query.chooseMonth;
                let secondChooseMonth = chooseMonth;
                var month = chooseMonth;
                if (!chooseMonth) {
                    let date = new Date();
                    month =
                        date.getFullYear().toString() +
                        "-" +
                        ("0" + (date.getMonth() + 1).toString()).slice(-2);
                    secondChooseMonth = month;
                }

                const itemPerPage = 10;
                const page =
                    !isNaN(req.query.page) && req.query.page > 0
                        ? req.query.page - 1
                        : 0;
                const title = req.query.title;
                const order = await importService.list(
                    title,
                    month,
                    page,
                    itemPerPage
                );
                const TotalPage =
                    Math.ceil(order.count / itemPerPage) > page + 1
                        ? Math.ceil(order.count / itemPerPage)
                        : page + 1;
                const pagItems = pagination.paginationFunc(page + 1, TotalPage);
                const mapns = await importService.genKeyPN();
                res.render("orders/import", {
                    Items: pagItems,
                    order: order.rows,
                    title: title,
                    chooseMonth: secondChooseMonth,
                    mapns: mapns,
                });
            }
        } else {
            res.redirect("/");
        }
    }

    //[POST]:importOrder/add
    async add(req, res, next) {
        try {
            if (req.user && req.user.LOAINV != 'emp') {
                var minquantity = await rules.getMinQuantity() 
                var sumquantity = await importService.sumQuantity(req);
                console.log(sumquantity) 
                if (sumquantity < minquantity) {
                    res.status(401).json("Số lượng nhập đang ít hơn quy định");
                }
                else {
                    req.body.MAPNS = await importService.genKeyPN();
                    const created = await importService.add(req);
                    if (created) {
                        req.session.cart = {};
                        return res.redirect("/importOrder");
                    } else {
                        res.status(401).json("Lỗi! Kiểm tra số lượng nhập");
                    }
                }
                
            } else {
                res.redirect("/");
            }
        } catch (err) {
            next(err);
        }
    }

    //[GET] importOrder/view/:id
    async view(req, res, next) {
        if (req.user) {
            if (req.user.LOAINV != "emp") {
                try {
                    const itemPerPage = 10;
                    const title = req.query.title;
                    const page =
                        !isNaN(req.query.page) && req.query.page > 0
                            ? req.query.page - 1
                            : 0;

                    const MAPN = req.params.id;
                    const ct_pn = await importService.getInfor(MAPN);
                    var books = await importService.getImportDetail(
                        MAPN,
                        title,
                        page,
                        itemPerPage
                    );
                    const TotalPage =
                        Math.ceil(books.count / itemPerPage) > page + 1
                            ? Math.ceil(books.count / itemPerPage)
                            : page + 1;
                    const pagItems = pagination.paginationFunc(
                        page + 1,
                        TotalPage
                    );
                    res.render("orders/importDetail", {
                        ct_pn,
                        Items: pagItems,
                        title: title,
                        books: books.rows,
                    });
                } catch (error) {
                    next(error);
                }
            }
        } else {
            res.redirect("/");
        }
    }
}
module.exports = new orderController();
