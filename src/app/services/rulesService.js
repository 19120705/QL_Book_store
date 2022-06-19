const {models} = require('../../config/db')

exports.getRules = async () => {
    return await models.quydinh.findOne()
}

exports.updateSave = async (req) => {
    const rule = await models.quydinh.findOne();
    rule.set(req.body);
    await rule.save()
}