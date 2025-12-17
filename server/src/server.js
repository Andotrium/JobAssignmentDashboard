const app = require("./app");
const connectDB = require("./config/db");
const User = require("./models/User");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

// const testUser = async () => {
//   const user = await User.create({
//     email: "test11112352452346@example.com",
//     password: "password123"
//   });
//   console.log("Test user created:", user.email);
// };

connectDB().then(async () => {   // 👈 MAKE THIS ASYNC

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
