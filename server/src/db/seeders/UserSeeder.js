import User from "../../models/User.js"

class UserSeeder {
  static async seed() {
    const userData = [
      { email: "nick@nick.com", cryptedPassword: "nick", username: "redheadedmut" },
      { email: "finn@finn.com", cryptedPassword: "finn", username: "sharkfinn" }
    ]
    for (const singleUser of userData){
      const currentUser = await User.query().findOne(singleUser)
      if(!currentUser){
          await User.query().insert(singleUser)
      }
    }
  }
}
export default UserSeeder