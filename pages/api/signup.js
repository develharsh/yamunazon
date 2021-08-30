import connectDB from "../../utils/connectDB";
import User from "../../models/userModel";
import bcrypt from "bcryptjs";

connectDB();

const Signup = async (req, res) => {
	const { phone, password, email, name } = req.body;
	try {
		const user = await User.findOne({ phone, email });
		if (user) {
			return res.status(422).json({ fail: "Phone already exists" });
		}
		const hashedPass = await bcrypt.hash(password, 12);
		const newuser = await new User({
			name,
			phone,
			password: hashedPass,
			email,
		}).save();
		//console.log(newuser)
		res.status(201).json({ message: "Success" });
	} catch (err) {
		return res.status(422).json({ fail: "Some error occured" });
	}
};

export default Signup;
