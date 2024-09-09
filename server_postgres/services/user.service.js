const { user_model } = require('../models')

// exports.get_all_user_for_admin = async (req) => {
//     const response = await user_model.find({}, null, { sort: { createdAt: -1 } })
//     response.password = undefined
//     return response
// }
exports.get_user_details = async (req) => {
    const { user_id } = req.body.user
    const response = await user_model.findOne({ _id: user_id })
    response.password = undefined
    return response
}
exports.patch_user_details = async (req) => {

    const { user, name, phone_no, email, pincode, address, city, country, state, fax } = req.body
    const { user_id } = user
    const update_data = { name: name, phone_no: phone_no, email: email, pincode, address, city, country, state, fax }
    const response = await user_model.updateOne({ _id: user_id }, { ...update_data })
    response.password = undefined
    console.log('response: ', response);
    return response
}
exports.set_user_inactive = async (req) => {
    const { user } = req.body
    const { user_id } = user
    const response = await user_model.findOneAndUpdate({ _id: user_id }, { status: "inactive" }, { upsert: false, new: true })
    response.password = undefined
    return response
}
exports.set_user_active = async (req) => {
    const { user } = req.body
    const { user_id } = user
    const response = await user_model.findOneAndUpdate({ _id: user_id }, { status: "active" }, { upsert: false, new: true })
    response.password = undefined
    return response
}

exports.set_user_image = async (req) => {
    const { user_id } = req.body.user
    const { image } = req.body
    console.log('image: ', image);
    const resp = await user_model.updateOne({_id:user_id} , {image})
    return resp
}
exports.delete_user_image = async (req) => {
    const { user_id } = req.body.user
    const resp = await user_model.updateOne({_id:user_id} , {image:""})
    return resp
}