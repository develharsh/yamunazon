import Category from "../../../models/catModel";

const Pid = async (req, res) => {
	switch (req.method) {
		case "GET":
			await getProperty(req, res);
			break;
		case "DELETE":
			await deleteProperty(req, res);
			case "PUT":
			await updateProduct(req, res);
	}
};

const getProperty = async (req, res) => {
	const { cid } = req.query;
	const category = await Category.findById(cid);
	res.status(200).json(category);
};
const deleteProperty = async (req, res) => {
	const { cid } = req.query;
	await Category.findByIdAndDelete(cid);
	res.status(200).json();
};
const updateProduct = async (req, res) => {
	const { cid } = req.query;
	await Category.findOneAndUpdate({ _id: cid }, req.body);
	res.status(200).json();
};

export default Pid;
