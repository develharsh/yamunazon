import Link from "next/link";
import Head from "next/head";
import Swal from "sweetalert2";
import router, { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const Categories = ({ categories }) => {
	const router = useRouter();
	const yesDelete = async (prodId) => {
		const res = await fetch(`${process.env.BASE_URL}/api/category/${prodId}`, {
			method: "DELETE",
		});
	};
	const deleteCat = (prodId, title) => {
		Swal.fire({
			title: "Delete " + title.substring(0, 10) + "... ?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				yesDelete(prodId);
				Swal.fire("Done", "Deleted Successfully.", "success");
				router.push("/admin/categories");
			}
		});
	};
	const propList = categories.map((category) => {
		return (
			<tr key={category._id}>
				<th>{category.title}</th>

				<td>
					<Link href={`/admin/category/edit/${category._id}`}>
						<a>
							<i className="fas fa-edit"></i>
						</a>
					</Link>
					<span style={{ marginLeft: "20px" }}></span>
					<i
						className="far fa-trash-alt text-danger"
						style={{ cursor: "pointer" }}
						onClick={() => {
							deleteCat(category._id, category.title);
						}}
					></i>
				</td>
			</tr>
		);
	});
	return (
		<div>
			<Head>
				<title>Admin Categories | Yamunazon.com</title>
			</Head>
			<div className="adminProductAddLink">
				<Link href="/admin/category/add">
					<a className="btn btn-success">
						<i className="fas fa-plus"></i> Add New Category
					</a>
				</Link>
			</div>
			<div className="container" style={{overflow:'auto'}}>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Title</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{propList}</tbody>
				</table>
			</div>
		</div>
	);
};

export async function getServerSideProps(context) {
	const { req, res } = context;
	try {
		const { power } = jwt.verify(
			req.cookies.tokenAuth,
			process.env.ACCESS_TOKEN_SECRET
		);
		if (power !== "addmin") throw 500;
	} catch (err) {
		res.writeHead(302, { Location: "/My_Cart" });
		res.end();
	}
	const ress = await fetch(`${process.env.BASE_URL}/api/categories`);
	const data = await ress.json();
	return {
		props: { categories: data }, // will be passed to the page component as props
	};
}
export default Categories;
