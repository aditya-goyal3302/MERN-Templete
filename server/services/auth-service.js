const mail_service = require("./mail-service");
const { utils } = require("../libs");
const { bad_request, conflict } = require("../libs/error");
const { user_repository, acl_repository, verification_logs_repository } = require("../repositories");
const { User } = require("../models");
const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const gen_response_with_token = async user_data => {
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
  return gen_response_with_token(resp);
};

exports.login = async ({ email, password }) => {
  return await user_repository.handleManagedTransaction(async transaction => {
    if (!email) throw new bad_request("Email Required");
    if (!password) throw new bad_request("Password Required");

    const user = await user_repository.find_and_compare_password({
      criteria: { email, password },
      options: { transaction },
    });
    return gen_response_with_token(user.toJSON());
  });
};

exports.forgot_password = async ({ email }) => {
  return await user_repository.handleManagedTransaction(async transaction => {
    if (!email) throw new bad_request("Email Required");

    const user = await user_repository.findOne({ criteria: { email }, options: { transaction } });
    if (!user) throw new bad_request("User Not Found!");
    if (user.status !== "active") throw new bad_request("User is not found!");

    const verification_log = await verification_logs_repository.create({
      payload: {
        user_id: user.id,
        email, purpose: "reset_password",
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 2),
        type: "TOKEN"
      },
      options: { transaction },
    })
    const token = verification_log.uuid;
    await mail_service.mail_reset_link({
      to: user.email,
      subject: "Reset Password Link",
      url: `${process.nextTick.CLIENT_URL.split(", ")[0]}/reset_password/${token}`,
    })
    return { message: "Reset Password Link Sent Successfully" };
  });
}

exports.verify_reset_token = async ({ token }) => {
  return await user_repository.handleManagedTransaction(async transaction => {
    if (!token) throw new bad_request("Token Required");

    const verification_log = await verification_logs_repository.findOne({
      criteria: { uuid: token, expires_at: { $gt: new Date() } },
      options: { transaction },
      include: [{ model: User, as: "user_details" }]
    })
    if (!verification_log.length) throw new bad_request("Token Expired or Invalid!");
    const user = verification_log.user_details;
    if (!user) throw new bad_request("User Not Found!");
    if (user.status !== "active") throw new bad_request("User is not found!");


    if (user.email !== verification_log.email) throw new bad_request("Email Mismatch!");
    if (user.status !== "active") throw new bad_request("User is not found!");

    return { message: "Token Verified Successfully" };
  });
}

exports.reset_password = async ({ token, password }) => {
  return await user_repository.handleManagedTransaction(async transaction => {
    if (!token) throw new bad_request("Token Required");
    if (!password) throw new bad_request("Password Required");
    const verification_log = await verification_logs_repository.findOne({
      criteria: { uuid: token, expires_at: { $gt: new Date() } },
      options: { transaction },
      include: [{ model: User, as: "user_details" }]
    });
    if (!verification_log) throw new bad_request("Token Expired or Invalid!");
    const user = verification_log.user_details;

    if (!user) throw new bad_request("User Not Found!");
    if (user.status !== "active") throw new bad_request("User is not found!");

    return await user_repository.update({
      criteria: { uuid: user_id },
      payload: { password },
      options: { transaction },
    });
  });
}

exports.change_password = async ({ user, old_password, new_password }) => {
  return await user_repository.handleManagedTransaction(async transaction => {
    if (!old_password) throw new bad_request("Old Password Required");
    if (!new_password) throw new bad_request("New Password Required");

    const user = await user_repository.find_and_compare_password({
      criteria: { email: user.email, password: old_password },
      options: { transaction },
    });
    if (!user) throw new bad_request("Invalid User or Incorrect Old Password ")
    return await user_repository.update({
      criteria: { uuid: user.uuid },
      payload: { password: new_password },
      options: { transaction },
    });
  });
}