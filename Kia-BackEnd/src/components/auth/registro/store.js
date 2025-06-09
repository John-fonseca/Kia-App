const User = require("../../../../databases/models/user-model");

class UserStore {
  static async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  static async findByEmail(email) {
    return await User.findOne({ email });
  }

  static async findById(id) {
    return await User.findById(id);
  }
}

module.exports = UserStore;
