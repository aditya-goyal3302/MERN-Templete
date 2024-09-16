const { user_repository } = require("../repositories");

// exports.get_all_user_for_admin = async (req) => {
//     const response = await user_repository.find({}, null, { sort: { createdAt: -1 } })
//     response.password = undefined
//     return response
// }
exports.patch_user_details = async ({
  user: { user_id },
  name,
  phone_no,
  email,
  pincode,
  address,
  city,
  country,
  state,
  fax,
}) => {
  const response = await user_repository.update({
    criteria: { id: user_id },
    payload: { name, phone_no, email, pincode, address, city, country, state, fax },
    options: { returning: true,
      plain: true },
  });
  const user = response[1];
  user.password = undefined;
  return user;
};
exports.set_user_inactive = async req => {
  const { user } = req.body;
  const { user_id } = user;
  const response = await user_repository.findOneAndUpdate(
    { id: user_id },
    { status: "inactive" },
    { upsert: false, new: true }
  );
  response.password = undefined;
  return response;
};
exports.set_user_active = async req => {
  const { user } = req.body;
  const { user_id } = user;
  const response = await user_repository.findOneAndUpdate(
    { id: user_id },
    { status: "active" },
    { upsert: false, new: true }
  );
  response.password = undefined;
  return response;
};

exports.set_user_image = async req => {
  const { user_id } = req.body.user;
  const { image } = req.body;
  console.log("image: ", image);
  const resp = await user_repository.updateOne({ id: user_id }, { image });
  return resp;
};
exports.delete_user_image = async req => {
  const { user_id } = req.body.user;
  const resp = await user_repository.updateOne({ id: user_id }, { image: "" });
  return resp;
};
