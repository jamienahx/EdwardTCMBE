const userModel = require("../models/user");

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};

//takes the data from the request body and calls createuser in the models file
async function createUser(req, res) {
    const modelResp = await userModel.createUser(req.body);
    if (modelResp.status && modelResp.status === 1) {
        return res.status(400).json({message: "User already exists"});
    } else if (modelResp.status && modelResp.status === 2) {
        return res.status(400).json({message: "Weak password"});
    } else {
        return res.json({message: "User created successfully"});
    }
}

async function loginUser(req, res) { //accepts login data from the request body
    const modelResp = await userModel.loginUser(req.body); //calls loginuser from models file
    if (modelResp.status && modelResp.status === 1) {
        return res.status(400).json({message: "Username or password is wrong"});
    } else if (modelResp.status === 0) {
        return res.json({message: "Login successful", jwt: modelResp.jwt});
    } 
}

async function logoutUser(req, res) {
  // your logout logic goes here
  await userModel.logoutUser(req.user.email);
  return res.json({ message: "Logout successful" });
}