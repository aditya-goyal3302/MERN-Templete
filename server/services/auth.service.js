const { user_model } = require('../models/index');
const { utils } = require('../libs')
exports.signup = async (req) => {
  const { email, password } = req.body;
  const exesting_user = await user_model.findOne({ email: email });
  if (exesting_user) {
    throw Object.assign(new Error("email_already_exists"), { code: 409 });
  }
  const user = new user_model({
    // first_name,
    // last_name,
    // username,
    email,
    password,
  });
  return await user.save();
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await user_model.findOne({ email })
  if (!user) {
    throw Object.assign(new Error("Invalid_email_or_password"), { code: 401 });
  }
  const check = await user.comparePassword(password);
  if (!check) {
    throw Object.assign(new Error("Invalid_email_or_password"), { code: 401 });
  }
  else {
    const token = await utils.createToken({ email: user.email, user_id: user._id, username: user.username });
    user.password = undefined;
    return { data: user, token: token }
  }
}