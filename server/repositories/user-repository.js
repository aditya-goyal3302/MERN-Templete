const { bad_request } = require("../libs/error");
const BaseRepository = require("./base-repository");
const { User, Acl } = require("../models");

class UserRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
  include = [
    {
      model: Acl,
      as: "role_data",
    },
  ];
  async findUser({ criteria, options }) {
    const resp = await this.findOne({
      criteria,
      options: { attributes: { exclude: ["password", "id"] }, ...options },
      include: this.include,
    });
    return resp.toJSON();
  }

  async findAllUser({ order = "DESC", limit, offset }) {
    const resp = await this.findAll({ include: this.include, order, limit, offset });
    return resp.toJSON();
  }

  async find_and_compare_password({ criteria: { email, password }, options = {} }) {
    const user = await this.findOne({ criteria: { email }, options: { ...options, plain: true } });
    if (!user || !user.status === "active") throw new bad_request("Invalid email or password");
    const check = await user.comparePassword(password);
    if (!check) throw new bad_request("Invalid email or password");
    return user.toJSON();
  }
}

module.exports = new UserRepository({
  model: User,
});
