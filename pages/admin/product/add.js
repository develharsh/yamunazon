import Head from "next/head";
import Link from "next/link";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { DataContext } from "../../../store/GlobalState";
import imageUpload from "../../../utils/imageUpload";

const AddProd = ({ categories }) => {
	const { state, dispatch } = useContext(DataContext);
	const router = useRouter();
	const initialState = {
		title: "",
		price: "",
		description: "",
		category: categories[0]._id,
	};
	const [prodData, setProdData] = useState(initialState);
	const [available, setAvail] = useState(true);
	const [img1, setImg1] = useState("");
	const [img2, setImg2] = useState("");
	const [img3, setImg3] = useState("");
	const [img4, setImg4] = useState("");
	const { title, price, description, category } = prodData;
	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setProdData({ ...prodData, [name]: value });
		dispatch({ type: "NOTIFY", payload: {} });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!title ||
			!price ||
			!description ||
			!img1 ||
			!img2 ||
			!img3 ||
			!img4
		) {
			return dispatch({
				type: "NOTIFY",
				payload: { fail: "Please fill all details." },
			});
		}
		dispatch({ type: "NOTIFY", payload: { loading: true } });
		const img1Url = await imageUpload(img1);
		const img2Url = await imageUpload(img2);
		const img3Url = await imageUpload(img3);
		const img4Url = await imageUpload(img4);
		const res = await fetch(`${process.env.BASE_URL}/api/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				price,
				description,
				images: [img1Url, img2Url, img3Url, img4Url],
				category,
				available,
			}),
		});
		dispatch({
			type: "NOTIFY",
			payload: { success: "Successfully, Uploaded." },
		});
		//router.push("/admin/products");
	};

	const catList = categories.map((category) => {
		return (
			<option key={category._id} value={category._id}>
				{category.title}
			</option>
		);
	});
	return (
		<div>
			<Head>
				<title>Add Product | Yamunazon.com</title>
			</Head>
			<div>
				<form className="container" onSubmit={(e) => handleSubmit(e)}>
					<div className="mb-3 mt-5">
						<label htmlFor="tilte" className="form-label">
							Title
						</label>
						<input
							type="text"
							className="form-control mt-2"
							name="title"
							value={title}
							onChange={handleChangeInput}
							id="tilte"
						/>
						<label htmlFor="price" className="form-label mt-4">
							Price
						</label>
						<input
							type="number"
							className="form-control"
							name="price"
							value={price}
							onChange={handleChangeInput}
							id="price"
						/>
						<div className="mt-4"></div>
						<label htmlFor="description">Description</label>
						<textarea
							className="form-control"
							name="description"
							id="description"
							value={description}
							onChange={handleChangeInput}
							rows="5"
						></textarea>

						<div className="mt-4 mb-3">
							<label htmlFor="img1" className="form-label">
								Image 1
							</label>
							<input
								className="form-control"
								type="file"
								id="img1"
								accept="image/*"
								onChange={(e) => {
									setImg1(e.target.files[0]);
								}}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="img2" className="form-label">
								Image 2
							</label>
							<input
								className="form-control"
								type="file"
								id="img2"
								accept="image/*"
								onChange={(e) => {
									setImg2(e.target.files[0]);
								}}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="img3" className="form-label">
								Image 3
							</label>
							<input
								className="form-control"
								type="file"
								id="img3"
								accept="image/*"
								onChange={(e) => {
									setImg3(e.target.files[0]);
								}}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="img4" className="form-label">
								Image 4
							</label>
							<input
								className="form-control"
								type="file"
								id="img4"
								accept="image/*"
								onChange={(e) => {
									setImg4(e.target.files[0]);
								}}
							/>
						</div>

						<label htmlFor="category" className="form-label mt-3">
							Category
						</label>
						<select
							className="form-select"
							name="category"
							onChange={handleChangeInput}
							id="category"
						>
							{catList}
						</select>
						<label htmlFor="available" className="form-label mt-4">
							Available Now
						</label>
						<span style={{ marginLeft: "10px" }}></span>
						<input
							type="checkbox"
							id="available"
							name="available"
							onChange={(e) => {
								setAvail(e.target.checked);
							}}
						/>
					</div>
					<div className="container">
						<Link href="/admin/products">
							<a className="btn btn-danger">Cancel</a>
						</Link>
						<span style={{ marginLeft: "20px" }}></span>
						<button
							type="submit"
							className="btn btn-primary justify-content-end"
						>
							<i className="fas fa-plus"></i> Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export async function getServerSideProps(context) {
	const { res } = context;
	const res3 = await fetch(`${process.env.BASE_URL}/api/categories`);
	let categories;
	try {
		categories = await res3.json();
	} catch (err) {
		res.writeHead(302, { Location: "/My_Cart" });
		res.end();
	}
	return {
		props: { categories },
	};
}
export default AddProd;
