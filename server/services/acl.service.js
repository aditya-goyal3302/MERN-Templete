const { acl_model } = require('../models')


exports.get_acls = async () => {
    const response = acl_model.find({}, null, { select: 'title _id' })
    return response
}
exports.checkpoint = async (req) => {
    const { role_id } = req.body.user
    // console.log('role_id: ', role_id);
    const { access_required } = req.body
    // console.log('access_required: ', access_required);
    const res = await acl_model.findOne({_id:role_id,access:{$in:access_required}})
    if(res){
        console.log('res: ', res);
        return true
    }
    else{
        return 403
    }
} 
/*

1:user
2:vendor
3:admin
4:user+vendor
5:user+admin
6:vendor+admin
7: all

*/