import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

let Dataset =
	mongoose.models.category || mongoose.model("category", catSchema);
export default Dataset;
