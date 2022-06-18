const {models} = require('../../config/db')

exports.getRules = async () => {
    return await models.quydinh.findOne()
}

exports.updateSave = async (req) => {
    const rule = await models.quydinh.findOne();
    // req.body.SoLuongNhapMin = Number(req.body.SoLuongNhapMin);
    // req.body.LuongTonMinTruocNhap = Number(req.body.LuongTonMinTruocNhap);
    // req.body.TienNoMax = Number(req.body.TienNoMax);
    // req.body.LuongTonMinSauBan = Number(req.body.LuongTonMinSauBan);
    rule.set(req.body);
    await rule.save()
}