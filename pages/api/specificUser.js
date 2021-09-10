import connectDB from "../../utils/connectDB";
import User from "../../models/userModel";
import bcrypt from "bcryptjs";

connectDB();

const specificUser = async (req, res) => {
	switch (req.method) {
		case "POST":
			await getUsEMail(req, res);
			break;
		case "PUT":
			await updatePassword(req, res);
	}
};

const getUsEMail = async (req, res) => {
	const { phone } = req.body;
	const user = await User.find({ phone }).select("phone email name");
	if (user) {
		res.status(200).json({ user });
	} else {
		res.status(404).json({ fail: "Not Found!" });
	}
};

const updatePassword = async (req, res) => {
	const { w, password } = req.body;
	const hashedPass = await bcrypt.hash(password, 12);
	const user = await User.findOneAndUpdate(
		{ _id: w },
		{ password: hashedPass }
	).select("phone email name");
	if (user) {
		res.status(200).json({ user });
	} else {
		res.status(404).json({ fail: "Not Found!" });
	}
};

export default specificUser;
