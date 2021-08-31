import connectDB from "../../utils/connectDB";
import Category from "../../models/catModel";

connectDB();

const PropertyApi = async (req, res) => {
	switch (req.method) {
		case "GET":
			await getAllProps(req, res);
			break;
		case "POST":
			await saveProperty(req, res);
			break;
	}
};

const getAllProps = async (req, res) => {
	const categories = await Category.find();
	res.status(200).json(categories);
};

const saveProperty = async (req, res) => {
	try {
		const { title } = req.body;
		const product = await new Category({
			title,
		}).save();
		res.status(201).json({ success: "Success" });
	} catch (error) {
		return res.status(422).json({ fail: "Something went wrong in Creating" });
	}
};

export default PropertyApi;
