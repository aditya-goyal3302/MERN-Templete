const { utils } = require("../libs");
const { bad_request, conflict } = require("../libs/error");
const { user_repository, acl_repository } = require("../repositories");

const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const gen_resp_with_token = async user_data => {
  const user = await user_repository.findUser({ criteria: { uuid: user_data.uuid } });
  const data = { ...user, password: undefined, role_id: undefined, role_data: { ...user.role_data.toJSON(), access: undefined, id: undefined, } };
  const token = await utils.create_token({ email: user.email, user_id: user.uuid, username: user.username, role: data.role_data });
  return { data, token: token };
};

exports.signup = async ({ name, username, email, password, role_id }) => {
  const resp = await user_repository.handleManagedTransaction(async transaction => {
    if (!name || name.length < 6) throw new bad_request("Name is invalid");
    if (!email || !email_regex.test(email)) throw new bad_request("Email Required");
    if (!password || password.length < 6 || password.length > 32) throw new bad_request("Password is invalid");
    if (!username || username.length < 6 || username.length > 32) throw new bad_request("Username is invalid");

    const is_existing_email = await user_repository.findOne({ criteria: { email }, options: { transaction } });
    if (is_existing_email) throw new conflict("Email Already Exists!");

    const is_existing_username = await user_repository.findOne({ criteria: { username }, options: { transaction } });
    if (is_existing_username) throw new conflict("Username Already Exists!");
    return await user_repository.create({
      payload: { status: "active", name, username, email, password, role_id: await acl_repository.getId(role_id) },
      options: { transaction },
    });
  });
  return gen_resp_with_token(resp);
};

exports.login = async ({ email, password }) => {
  return await user_repository.handleManagedTransaction(async transaction => {
    if (!email) throw new bad_request("Email Required");
    if (!password) throw new bad_request("Password Required");

    const user = await user_repository.find_and_compare_password({
      criteria: { email, password },
      options: { transaction },
    });
    return gen_resp_with_token(user.toJSON());
  });
};
