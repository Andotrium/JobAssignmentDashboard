require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const User = require("./models/User");

const PORT = process.env.PORT || 8080;

// const testUser = async () => {
//   const user = await User.create({
//     email: "test11112352452346@example.com",
//     password: "password123"
//   });
//   console.log("Test user created:", user.email);
// };
console.log(`server connecting:${process.env.URL}`);

connectDB().then(async () => {   // 👈 MAKE THIS ASYNC

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
