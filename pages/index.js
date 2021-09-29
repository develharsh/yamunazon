import Link from "next/link";
import Head from "next/head";

const Home = ({ properties }) => {
	const propList = properties.map((product) => {
		return (
			<div key={product._id} className="col">
				<div className="card" style={{ width: "20rem" }}>
					<img src={product.images[0]} className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">{product.title}</h5>
						<p className="card-text">₹ {product.price}</p>
						<Link href={`/product?s=${product._id}`}>
							<a target="_blank" className="stretched-link"></a>
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
				<meta
          			name="description"
          			content="www.yamunazon.com, Buy best quality products at affordable price"
        			/>
        			<link rel="shortcut icon" href="/logo.jpg" type="image/x-icon" />
			</Head>
			<div className="container px-4">
				<div className="row gx-5">{propList}</div>
			</div>
		</div>
	);
};

export async function getServerSideProps(context) {
	let ress;
	const { req, res, query } = context;
	ress = await fetch(`${process.env.BASE_URL}/api/products?c=${query.c}`);
	const data = await ress.json();
	return {
		props: { properties: data }, // will be passed to the page component as props
	};
}

export default Home;
