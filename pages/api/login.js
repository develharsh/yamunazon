import connectDB from "../../utils/connectDB";
import User from "../../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

const Login = async (req, res) => {
	const { phone, password } = req.body;
	try {
		const user = await User.findOne({ phone });
		if (!user) {
			return res.status(400).json({ fail: "No such user found" });
		}
		const doMatch = await bcrypt.compare(password, user.password);

		if (doMatch) {
			const token = jwt.sign(
				{ power: user.power },
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: "15m",
				}
			);
			res.status(202).json({ tokenAuth: token, whoU: [user._id, user.power] });
		} else {
			return res.status(400).json({ fail: "No such user found" });
		}
	} catch (err) {
		return res.status(400).json({ fail: "Something went Wrong during Login" });
	}
};

export default Login;
