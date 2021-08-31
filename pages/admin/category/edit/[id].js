import Head from "next/head";
import Link from "next/link";
import { useState, useContext } from "react";
import { DataContext } from "../../../../store/GlobalState";
import { useRouter } from "next/router";

const Productt = ({ category }) => {
	const router = useRouter();
	const { state, dispatch } = useContext(DataContext);
	const [title, setTitle] = useState(category.title);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title) {
			return dispatch({
				type: "NOTIFY",
				payload: { fail: "Please Add Title." },
			});
		}
		dispatch({ type: "NOTIFY", payload: { loading: true } });
		const res = await fetch(
			`${process.env.BASE_URL}/api/category/${category._id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
				}),
			}
		);
		dispatch({
			type: "NOTIFY",
			payload: { success: "Successfully, Updated." },
		});
		router.push("/admin/categories");
	};
	return (
		<div className="container">
			<Head>
				<title>Edit Category | Yamunazon.com</title>
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
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						id="tilte"
					/>
				</div>

				<div className="container">
					<Link href="/admin/categories">
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
	const res3 = await fetch(`${process.env.BASE_URL}/api/category/${id}`);
	let category;
	try {
		category = await res3.json();
	} catch (err) {
		res.writeHead(302, { Location: "/My_Cart" });
		res.end();
	}
	return {
		props: { category },
	};
}

export default Productt;
