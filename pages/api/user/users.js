import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";

connectDB();

const PropertyApi = async (req, res) => {
	switch (req.method) {
		case "GET":
			await getAllProps(req, res);
			break;
	}
};

const getAllProps = async (req, res) => {
	const users = await User.find().select("name email phone");
	res.status(200).json(users);
};

export default PropertyApi;
