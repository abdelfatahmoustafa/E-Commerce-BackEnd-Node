import UserModel from "../../../db/models/user-model/user-model.js";

export const signUp = async (req, res, next) => {
  const { name, email,password } = req.body;

  try {
    if (await UserModel.findOne({ email })) {
      return next({
        status: 409,
        message:
          "A user with this email already exists. Please log in instead of signing up again.",
      });
    }

    const userObject = {
      ...req.body,
      image: {
        secure_url: req.file?.path,
        public_id: req.file?.filename,
      },
    };

    const user = await UserModel.create(userObject);
    return res.status(201).json({ message: "user created successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error during signup", error });
  }
};

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next({
        status: 404,
        message: "No user found with this email. Please sign up first.",
      });
    }
    if (user.password !== password) {
      return next({
        status: 401,
        message: "Incorrect email or password. Please try again.",
      });
    }
    return res.status(200).json({ message: "login successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error during login", error });
  }
};
