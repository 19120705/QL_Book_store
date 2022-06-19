const pagination = require("../../public/js/pages/pagination");
const billService = require("../services/billService");
const rulesService = require("../services/rulesService");
const e = require("express");
// dùng để in csv
const CsvParser = require("json2csv").Parser;

class sellingController {
    //[GET]: /bill
    async list(req, res, next) {
        if (req.user) {
            const itemPerPage = 10;
            const title = req.query.title;
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
            //console.log(MONTH(month));
            const page =
                !isNaN(req.query.page) && req.query.page > 0
                    ? req.query.page - 1
                    : 0;
            const bill = await billService.list(
                title,
                month,
                page,
                itemPerPage,
                req.user.MANV
            );
            const TotalPage =
                Math.ceil(bill.count / itemPerPage) > page + 1
                    ? Math.ceil(bill.count / itemPerPage)
                    : page + 1;
            const pagItems = pagination.paginationFunc(page + 1, TotalPage);
            res.render("bill/bill", {
                Items: pagItems,
                bill: bill.rows,
                message: req.query.message,
                title: title,
                chooseMonth: secondChooseMonth,
            });
        } else {
            res.redirect("/");
        }
    }
    //[POST]: /bill/add
    async add(req, res, next) {
        try {
            if (req.user ) {
                req.body.MAHD = await billService.genKeyHD();
                req.body.MinBook = await rulesService.getSoldMin();
                const created = await billService.add(req);
                if (created) {
                    req.session.cart = {};
                    return res.redirect("back");
                } else {
                    res.status(401).json("Lỗi! Kiểm tra thông tin nợ");
                }
            } else {
                res.redirect("/");
            }
        } catch (err) {
            next(err);
        }
    }

    //[GET] bill/view/:id
    async view(req, res, next) {
        if (req.user) {
                try {
                    const itemPerPage = 10;
                    const title = req.query.title;
                    const page =
                        !isNaN(req.query.page) && req.query.page > 0
                            ? req.query.page - 1
                            : 0;

                    const MAHD = req.params.id;
                    const ct_hd = await billService.getInfor(MAHD);
                    const emp = await billService.getEmp(ct_hd.MANV);
                    var books = await billService.getBillDetail(
                        MAHD,
                        title,
                        page,
                        itemPerPage
                    );
                    books.rows = await billService.getBookInfor(books.rows);
                    const TotalPage =
                        Math.ceil(books.count / itemPerPage) > page + 1
                            ? Math.ceil(books.count / itemPerPage)
                            : page + 1;
                    const pagItems = pagination.paginationFunc(
                        page + 1,
                        TotalPage
                    );
                    res.render("bill/billDetail", {
                        ct_hd,
                        emp,
                        Items: pagItems,
                        title: title,
                        books: books.rows,
                    });
                } catch (error) {
                    next(error);
                }
        }else{
            res.redirect("/");
        }
    }
    //[GET]: /bill/print/:id
    async print(req, res, next) {
        if (req.user) {
            let printTable = [];
            const MAPM = req.params.id;
            const ct_hd = await billService.getInfor(MAHD);
            const books = await billService.getBillDetail(MAHD, "", 0, 10000); //get all books
            books.rows = await billService.getBookInfor(books.rows);
            books.rows.forEach((element) => {
                const { MASACH, TENSACH, LOAISACH, SOLUONG, DONGIA } = element;
                printTable.push({ MASACH, TENSACH, LOAISACH, SOLUONG, DONGIA });
            });
            console.log(printTable);
            const csvFields = [
                "MASACH",
                "TENSACH",
                "TACGIA",
                "THELOAI",
                "SOLUONG",
            ];
            const csvParser = new CsvParser({ csvFields, withBOM: true });
            let csvData = [];
            if (printTable) {
                csvData = csvParser.parse(printTable);
            }
            const file_name =
                MAHD +
                "-" +
                ct_hd.NGAYLAPHOADON +
                "-" +
                ct_hd.MANV +
                "-" +
                ct_hd.MAKH;
            res.setHeader("Content-Type", "text/csv; charset=utf-8;");
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + file_name + ".csv"
            );
            res.status(200).end(csvData);
        } else {
            res.redirect("/");
        }
    }
}

module.exports = new sellingController();
