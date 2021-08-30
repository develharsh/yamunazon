import Product from "../../../models/ProductModel";

const Pid = async (req, res) => {
	switch (req.method) {
		case "GET":
			await getProperty(req, res);
			break;
		case "DELETE":
			await deleteProperty(req, res);
	}
};

const getProperty = async (req, res) => {
	const { pid } = req.query;
	const product = await Product.findById(pid);
	res.status(200).json({ product });
};
const deleteProperty = async (req, res) => {
	const { pid } = req.query;
	await Property.findByIdAndDelete(pid);
	res.status(200).json({ message: "Success" });
};

export default Pid;
