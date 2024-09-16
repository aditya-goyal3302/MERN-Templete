const { bad_request } = require("../libs/error");
const BaseRepository = require("./base-repository");

class UserRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }

  async find_and_compare_password({criteria:{ email, password }, options={}}) {
    const user = await this.findOne({ criteria: { email } });
    if (!user || !user.status === "active") throw new bad_request("Invalid email or password");
    const check = await user.comparePassword(password);
    if (!check) throw new bad_request("Invalid email or password");
    return user;
  }
}

module.exports = new UserRepository({
  model: require("../models").User,
});
