import User from "../models/User.js";

// Create user (Admin only)
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Check if admin already exists
  if (role === "admin") {
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      return res.status(400).json({
        message: "Admin already exists. Cannot create another."
      });
    }
  }

  const user = await User.create({
    username,
    email,
    password,
    role: "salesperson",
  });

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    },
  });
};

// Get all users
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Delete user
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.deleteOne();
  res.json({ message: "User removed" }, user);
};