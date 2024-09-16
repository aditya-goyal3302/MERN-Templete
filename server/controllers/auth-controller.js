const { CREATED, SUCCESS } = require("../libs/constants");
const { auth_service } = require("../services/index");

exports.signup = async (req, res, next) => {
  try {
    const result = await auth_service.signup(req.body);
    res.status(CREATED).send(result);
  } catch (error) {
    console.log("error_in_signup: ", error);
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await auth_service.login(req.body);
    res.status(SUCCESS).send(result);
  } catch (error) {
    console.log("error_in_login: ", error);
    return next(error);
  }
};
