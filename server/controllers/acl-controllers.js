const { acl_service } = require('../services')

exports.get_acls = async (req, res) => {
    try {
        const response = await acl_service.get_acls()
        res.status(200).send(response)
    } catch (error) {
        console.log('error_in_get_acls: ', error);
        res.status(500).send(error)
    }
}
exports.checkpoint = async (req, res) => {
    try {
        const response = await acl_service.checkpoint(req)
        if(response == 403) 
            throw Object.assign({message:"Forbidden",status:403})
        res.status(200).send(response)
    } catch (error) {
        // console.log('error_in_get_acls: ', error);
        res.status(error.status||500).send({message: error.message||error})
    }
}