const { auth_service } = require("../services/index");

exports.signup = async (req, res) => {
    const{ first_name, last_name, username, email, password } = req.body;
  try {
    if (
        // !first_name ||
        // !last_name ||
        // !username ||
        !email ||
        !password
    ) {
      return res.status(400).send("Invalid_input");
    }
    const result = await auth_service.signup(req);
    res.status(201).send(true);
  } catch (error) {
    console.log("error_in_signup: ", error);
    res.status(error.code || 500).send(error.message || error);
  }
};

exports.login = async (req, res) => {
  console.log("in auth.controller.js")
  try {
    const{ email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
      return res.status(400).send("Invalid_input");
    }
    const result = await auth_service.login(req);
    res.status(200).send(result);
  } catch (error) {
    console.log("error_in_login: ", error);
    res.status(error.code || 500).send(error.message || error);
  }
};
