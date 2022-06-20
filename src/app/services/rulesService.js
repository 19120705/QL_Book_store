const {models} = require('../../config/db')

exports.getRules = async () => {
    return await models.quydinh.findOne()
}

exports.getCurrIMin = async () => {
    rules = await this.getRules()
    return rules.LuongTonMinTruocNhap
}
exports.getCurrEMin = async () => {
    rules = await this.getRules()
    return rules.LuongTonMinSauBan
}
exports.getMinQuantity = async () => {
    rules = await this.getRules()
    return rules.SoLuongNhapMin
}
exports.getSoldMax = async () => {
    rules = await this.getRules()
    return rules.TienNoMax
}

exports.updateSave = async (req) => {
    const rule = await models.quydinh.findOne();
    rule.set(req.body);
    await rule.save()
}
exports.getCurrIMin = async () => {
    rules = await this.getRules()
    return rules.LuongTonMinTruocNhap
}
exports.getCurrEMin = async () => {
    rules = await this.getRules()
    return rules.LuongTonMinSauBan
}
exports.getMinQuantity = async (emp) => {
    rules = await this.getRules()
    return rules.SoLuongNhapMin
}
exports.getSoldMax = async () => {
    rules = await this.getRules()
    return rules.TienNoMax
}