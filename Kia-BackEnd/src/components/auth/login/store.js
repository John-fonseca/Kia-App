const User = require("../../../../databases/models/user-model");

class LoginStore {
  static async findByEmail(email) {
    return await User.findOne({ email }).select("+password");
  }

  static async updateLoginData(userId, lastLogin) {
    return await User.findByIdAndUpdate(userId, { lastLogin }, { new: true });
  }
}

module.exports = LoginStore;
