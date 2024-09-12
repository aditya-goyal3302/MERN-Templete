const BaseRepository = require("./baseRepository");

class UserRepository extends BaseRepository {
  
}

module.exports = new UserRepository({
  model: require("../models").User,
});
