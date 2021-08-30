import Link from "next/link";
import Head from "next/head";

const Home = ({ properties }) => {
	const propList = properties.map((product) => {
		return (
			<div key={product._id} className="col">
				<div className="card" style={{ width: "18rem" }}>
					<img src={product.images[0]} className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">{product.title}</h5>
						<p className="card-text">Rs. {product.price}</p>
						<Link href={`/product/${product._id}`}>
							<a target="_blank" className="btn btn-primary">
								View Product
							</a>
						</Link>
					</div>
				</div>
			</div>
		);
	});

	/*Main Component Below*/
	return (
		<div>
			<Head>
				<title>Home | Yamunazon.com</title>
			</Head>
			<div className="container px-4">
				<div className="row gx-5">{propList}</div>
			</div>
		</div>
	);
};

export async function getServerSideProps(context) {
	const ress = await fetch(`${process.env.BASE_URL}/api/products`);
	const { req, res } = context;
	let data;
	try {
		data = await ress.json();
	} catch (err) {
		res.writeHead(302, { Location: "/" });
		res.end();
	}
	return {
		props: { properties: data }, // will be passed to the page component as props
	};
}

export default Home;
