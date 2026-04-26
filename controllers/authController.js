import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Login
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
}

// Get current user
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};