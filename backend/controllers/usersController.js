const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');

// @desc register a user
// @route POST /api/user
// @access PUBLIC
const registerUser = asyncHandler(async(req, res) => {
  // get user credentials
  const { name, password, securityAnswer } = req.body

  // validate user credentials
  if (!name || !password || !securityAnswer)
  {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  // check if the user already exists
  const exists = await User.findOne({ name });
  
  if (exists)
  {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password and security answer
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, salt);

  // add credentials to the db
  const user = await User.create({
    name,
    password: hashedPassword,
    securityAnswer: hashedSecurityAnswer
  })

  if (user)
  {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      token: generateToken(user.id)
    })
  }
  else
  {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc log user
// @route POST /api/user/login
// @access PUBLIC
const logUser = asyncHandler(async(req, res) => {
  // get user credentials
  const { name, password } = req.body

  // validate user credentials
  const user = await User.findOne({ name });

  if (!user)
  {
    res.status(404);
    throw new Error('User does not exist');
  }

  if (!(await bcrypt.compare(password, user.password)))
  {
    res.status(400);
    throw new Error('Invalid password');
  }

  res.status(200).json({
    _id: user.id,
    name: user.name,
    token: generateToken(user.id)
  })
});

// @desc log user using security q/a
// @route POST /api/user/login
// @access PUBLIC
const logUserSecurityQuestion = asyncHandler(async(req, res) => {
  // get user credentials
  const { name, securityAnswer } = req.body;

  // validate user credentials
  const user = await User.findOne({ name });

  if (!user)
  {
    res.status(404);
    throw new Error('User does not exist');
  }

  if (!(await bcrypt.compare(securityAnswer, user.securityAnswer)))
  {
    res.status(400);
    throw new Error('Invalid security answer');
  }

  res.status(200).json({
    _id: user.id,
    name: user.name,
    token: generateToken(user.id)
  })
});

const generateToken = (id) =>
{
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  registerUser,
  logUser,
  logUserSecurityQuestion
}
