import Head from "next/head";
import Link from "next/link";
import { DataContext } from "../store/GlobalState";
import { useState, useContext } from "react";
import { addToCart } from "../store/Actions";

const Productt = ({ product }) => {
	const { state, dispatch } = useContext(DataContext);
	const { cart } = state;
	const [tab, setTab] = useState(0);
	const isActive = (index) => {
		if (tab === index) return "ImgDetactive";
		return "";
	};
	return (
		<div>
			<Head>
				<title>{product.title} | Yamunazon.com</title>
				<meta
						name="description"
						content="www.yamunazon.com, Buy best quality products at affordable price"
        			/>
        			<link rel="shortcut icon" href="/logo.jpg" type="image/x-icon" />
			</Head>
			<div className="container mx-1">
				<div className="row">
					<div className="col">
						<img src={product.images[tab]} alt="..." className="prodIdImg" />
						<div style={{ marginTop: "10px" }}></div>
						{product.images.map((img, index) => (
							<img
								key={index}
								src={img}
								alt={img}
								className={`mainImgOfProdDetail ${isActive(index)}`}
								style={{ height: "40px", width: "100px", objectFit: "contain" }}
								onClick={(e) => {
									setTab(index);
								}}
							/>
						))}
					</div>
					<div className="col">
						<h2>{product.title}</h2>
						<div
							className="btn-group"
							role="group"
							aria-label="Basic mixed styles example"
						>
							<button
								type="button"
								className="btn btn-info"
								disabled={!product.available}
								onClick={(e) => dispatch(addToCart(product, cart))}
							>
								<i className="fas fa-cart-plus"></i> Add to Cart
							</button>
							<span style={{ marginLeft: "33px" }}></span>
							<Link
								href={`https://wa.me/+918279766773?text=Hello,%20I%20want%20to%20ask%20about%20the%20product:%20${product._id}`}
							>
								<a target="_blank" className="btn btn-success">
									<i className="fab fa-whatsapp"></i> Ask on WhatsApp
								</a>
							</Link>
						</div>
						{!product.available && (
							<h6 className="text-danger">Sorry, Currently not available</h6>
						)}
						<hr></hr>
						<h6>₹ {product.price}</h6>
						<h3>Description</h3>
						<p>{product.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getServerSideProps(context) {
	const { s } = context.query;//context.params;
	const { res } = context;
	const res2 = await fetch(`${process.env.BASE_URL}/api/product/${s}`);
	let data;
	try {
		data = await res2.json();
	} catch (err) {
		res.writeHead(302, { Location: "/My_Cart" });
		res.end();
	}
	return {
		props: { product: data.product },
	};
}

export default Productt;
