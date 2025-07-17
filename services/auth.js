const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/User");

const saltRounds = 10;

const login = async (username, password) => {
  try {
    // Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return { error: "Invalid Credentials", errorCode: 401 };
    }

    // Compare hashes
    if (!(await compareHash(password, user.password))) {
      return { error: "Invalid Credentials", errorCode: 401 };
    }

    // If correct sign token
    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    return { token };
  } catch (err) {
    // TODO: remove logging in production
    console.error(err);
    return { error: "Failed to login", errorCode: 500 };
  }
};

const register = async (username, password) => {
  try {
    // check if user exists
    const user = await User.findOne({ username });
    if (user) {
      return { error: "User already exists", errorCode: 400 };
    }

    // hash password and create user
    const hash = await hashPassword(password);
    const newUser = await User.create({ username, password: hash });

    // sign token
    const token = jwt.sign(
      { id: newUser._id, username },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 }
    );

    return { token };
  } catch (err) {
    console.error(err);
    return { error: "Failed to register", errorCode: 500 };
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const compareHash = async (plaintextPassword, hash) => {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
};

module.exports = { login, register };
