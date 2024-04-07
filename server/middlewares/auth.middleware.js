const {utils} = require('../libs')

exports.verify_auth = async (req,res,next)=>{
    const token = req.headers.authorization
    // console.log('token: ', token);
    if (!token) {
        return res.status(401).send({ code:401 ,message: 'Unauthorized' });
      }
    try{
        const decodetoken = utils.verifyToken(token)
        // console.log('decodetoken: ', decodetoken);
        req.body.user = decodetoken
        next();
    }   
    catch(err){
        console.log("err_in_auth_verify: ",err)
        res.status(401).send({ code:401 ,message: 'Unauthorized' });
    }
}