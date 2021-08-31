import Link from "next/link";
import Head from "next/head";
import Swal from "sweetalert2";
import router, { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const Products = ({ products }) => {
	const router = useRouter();
	const yesDelete = async (prodId) => {
		const res = await fetch(`${process.env.BASE_URL}/api/product/${prodId}`, {
			method: "DELETE",
		});
	};
	const deleteProduct = (prodId, title) => {
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
				router.push("/admin/products");
			}
		});
	};
	const propList = products.map((product) => {
		return (
			<tr key={product._id}>
				<th>
					<img
						src={product.images[0]}
						alt="..."
						width="30px"
						height="30px"
						style={{ objectFit: "cover" }}
					/>
				</th>
				<td>
					<Link href={`/product/${product._id}`}>
						<a target="_blank">{product.title.substring(0, 14)}...</a>
					</Link>
				</td>
				<td>
					<Link href={`/admin/product/edit/${product._id}`}>
						<a>
							<i className="fas fa-edit"></i>
						</a>
					</Link>
					<span style={{ marginLeft: "20px" }}></span>
					<i
						className="far fa-trash-alt text-danger"
						style={{cursor:'pointer'}}
						onClick={() => {
							deleteProduct(product._id, product.title);
						}}
					></i>
				</td>
			</tr>
		);
	});
	return (
		<div>
			<Head>
				<title>Admin Products | Yamunazon.com</title>
			</Head>
			<div className="adminProductAddLink">
				<Link href="/admin/product/add">
					<a className="btn btn-success">
						<i className="fas fa-plus"></i> Add New Product
					</a>
				</Link>
			</div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Image</th>
						<th>Title</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{propList}</tbody>
			</table>
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
	const ress = await fetch(`${process.env.BASE_URL}/api/products`);
	const data = await ress.json();
	return {
		props: { products: data }, // will be passed to the page component as props
	};
}
export default Products;
