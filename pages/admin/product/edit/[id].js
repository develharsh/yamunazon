import Head from "next/head";
import Link from "next/link";
import { useState, useContext } from "react";
import { DataContext } from "../../../../store/GlobalState";
import { useRouter } from "next/router";

const Productt = ({ product, categories }) => {
	const router = useRouter();
	const { state, dispatch } = useContext(DataContext);
	const initialState = {
		title: product.title,
		price: product.price,
		description: product.description,
		category: product.category,
	};
	const [available, setAvail] = useState(product.available);
	const [prodData, setProdData] = useState(initialState);
	const { title, price, description, category } = prodData;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setProdData({ ...prodData, [name]: value });
		dispatch({ type: "NOTIFY", payload: {} });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !price || !description || !category) {
			return dispatch({ type: "NOTIFY", payload: { fail: "Please fill all details." } });
		}
		dispatch({ type: "NOTIFY", payload: { loading: true } });
		const res = await fetch(
			`${process.env.BASE_URL}/api/product/${product._id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					price,
					description,
					category,
					available,
				}),
			}
		);
		dispatch({
			type: "NOTIFY",
			payload: { success: "Successfully, Updated." },
		});
		router.push("/admin/products");
	};

	const catList = categories.map((category) => {
		return (
			<option key={category._id} value={category._id}>
				{category.title}
			</option>
		);
	});
	return (
		<div className="container">
			<Head>
				<title>Edit Product | Yamunazon.com</title>
			</Head>
			<form onSubmit={handleSubmit}>
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

					<label htmlFor="category" className="form-label mt-4">
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
					<button type="submit" className="btn btn-primary justify-content-end">
						Update
					</button>
				</div>
			</form>
		</div>
	);
};

export async function getServerSideProps(context) {
	const { id } = context.params;
	const { res } = context;
	const res2 = await fetch(`${process.env.BASE_URL}/api/product/${id}`);
	const res3 = await fetch(`${process.env.BASE_URL}/api/categories`);
	let data, categories;
	try {
		data = await res2.json();
		categories = await res3.json();
	} catch (err) {
		res.writeHead(302, { Location: "/My_Cart" });
		res.end();
	}
	return {
		props: { product: data.product, categories },
	};
}

export default Productt;
