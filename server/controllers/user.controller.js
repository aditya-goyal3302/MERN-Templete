const { user_service } = require('../services')

// exports.get_all_user_for_admin = async (req, res, next)=>{
//     try {
//         const response = await user_service.get_all_user_for_admin(req)
//         if (response.length === 0) return res.status(204)
//         res.status(200).send(response)
//     } catch (error) {
//         console.log('error_controller_get_all_users: ', error);
//         res.status(500).send(error)
//     }
// }
exports.get_user_details = async (req, res, next)=>{
    try {
        const response = await user_service.get_user_details(req)
        if (!response) return res.status(204)
        res.status(200).send(response)
    } catch (error) {
        console.log('error_controller_get_user_details: ', error);
        res.status(500).send(error)
    }
}
exports.set_user_inactive = async (req, res, next)=>{
    try {
        const response = await user_service.set_user_inactive(req)
        if (!response) return res.status(204)
        res.status(200).send(response)
    } catch (error) {
        console.log('error_controller_patch_user_details: ', error);
        res.status(500).send(error)
    }
}
exports.patch_user_details = async (req, res, next)=>{
    try {
        const response = await user_service.patch_user_details(req)
        if (!response) return res.status(204)
        res.status(200).send(response)
    } catch (error) {
        console.log('error_controller_patch_user_details: ', error);
        res.status(500).send(error)
    }
}
exports.set_user_active = async (req, res, next)=>{
    try {
        const response = await user_service.set_user_active(req)
        if (!response) return res.status(204)
        res.status(200).send(response)
    } catch (error) {
        console.log('error_controller_patch_user_details: ', error);
        res.status(500).send(error)
    }
}
exports.set_user_image = async (req, res, next)=>{
    try {
        const response = await user_service.set_user_image(req)
        res.status(200).send(response)
    } catch (error) {
        console.log('error_controller_set_user_image: ', error);
        res.status(500).send(error)
    }
}
exports.delete_user_image = async (req, res, next)=>{
    try {
        const response = await user_service.delete_user_image(req)
        res.status(200).send(response)
    } catch (error) {
        console.log('error_controller_delete_user_image: ', error);
        res.status(500).send(error)
    }
}