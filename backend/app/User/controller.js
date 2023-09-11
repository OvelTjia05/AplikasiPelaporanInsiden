const User = require("./model");

//@description     Get All User data
//@route           GET /api/users
//@access          Public
const getAllUser = async (req, res) => {
  // if (req.role === "admin") {
  try {
    const users = await User.findAll();
    console.log(users);

    res.status(200).json({
      code: "200",
      status: "OK",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error,
    });
    // }
    // } else {
    //   res.status(401).json({
    //     code: "401",
    //     status: "UNATHORIZED",
    //     errors: "Please login as admin",
    //   });
  }
};

module.exports = {
  getAllUser,
};
