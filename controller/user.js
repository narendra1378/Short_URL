const {v4:uuidv4} = require('uuid');
const User = require("../models/user");
const {getUser,setUser} = require('../service/auth') 
async function handleUsersignUp(req, res) {
  const { name, emails, password } = req.body;
  await User.create({
    name,
    emails,
    password,
  });
  return res.redirect("/");
}
async function handleUserLogIn(req, res) {
  const { emails, password } = req.body;
  const user = await User.findOne({ emails, password });
  if (!user)
    return res.render("logIn", {
      error: "Invalid UserName or Password",
    });

     
    const token = setUser(user);
    res.cookie('token',token);
    

  return res.redirect("/");// login hua to homePage 
}
module.exports = {
  handleUsersignUp,
  handleUserLogIn,
};
