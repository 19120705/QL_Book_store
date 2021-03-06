const pagination = require("../../public/js/pages/pagination");
const debtService = require("../services/debtService");

class debtController {
    //[GET]: debt/
    async list(req, res, next) {
        if (req.user) {
            const itemPerPage = 10;
            const title = req.query.title;
            let chooseMonth = req.query.chooseMonth;
            let secondChooseMonth = chooseMonth;
            var month;
            if (chooseMonth) {
                month = chooseMonth.split("-");
                month = month.join("");
            } else {
                let date = new Date();
                month =
                    date.getFullYear().toString() +
                    "-" +
                    ("0" + (date.getMonth() + 1).toString()).slice(-2);
                secondChooseMonth = month;
                month = month.split("-");
                month = month.join("");
            }

            const page =
                !isNaN(req.query.page) && req.query.page > 0
                    ? req.query.page - 1
                    : 0;
            const Debts = await debtService.list(
                title,
                month,
                page,
                itemPerPage
            );
            const TotalPage =
                Math.ceil(Debts.count / itemPerPage) > page + 1
                    ? Math.ceil(Debts.count / itemPerPage)
                    : page + 1;
            const pagItems = pagination.paginationFunc(page + 1, TotalPage);
            res.render("debt/debt", {
                Items: pagItems,
                Debts: Debts.rows,
                message: req.query.message,
                title: title,
                chooseMonth: secondChooseMonth,
                amount: Debts.count,
            });
        } else {
            res.redirect("/");
        }
    }
}
module.exports = new debtController();
