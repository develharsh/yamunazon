import Head from "next/head";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import jwt from 'jsonwebtoken'

const AddCategory = () => {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch(`${process.env.BASE_URL}/api/categories`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
			}),
		});
		Swal.fire("Done", "Added Successfully.", "success");
		router.push("/admin/categories");
	};
	return (
		<div>
			<Head>
				<title>Add Category | Yamunazon.com</title>
			</Head>
			<div>
				<form
					className="container"
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<div className="mb-3 mt-5">
						<label htmlFor="title" className="form-label">
							Title
						</label>
						<input
							type="text"
							className="form-control"
							id="title"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						<i className="fas fa-plus"></i> Add
					</button>
				</form>
			</div>
		</div>
	);
};
export default AddCategory;
