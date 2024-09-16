const {utils} = require('../libs');
const { unauthorized, forbidden } = require('../libs/error');

exports.verify_auth = async (req,res,next)=>{
    const token = req.headers.authorization
    // console.log('token: ', token);
    if (!token) {
        return res.status(401).send({ code:401 ,message: 'Unauthorized' });
      }
    try{
        const decodetoken = utils.verify_token(token)
        // console.log('decodetoken: ', decodetoken);
        req.body.user = decodetoken
        next();
    }   
    catch(err){
        console.log("err_in_auth_verify: ",err)
        throw new unauthorized('Unauthorized')
    }
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
        throw new forbidden('Forbidden')
    }
} 