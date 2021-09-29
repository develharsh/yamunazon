import Link from "next/link";
import Head from "next/head";

const AllCats = ({ categories }) => {
	const propList = categories.map((category) => {
		return (
			<div key={category._id} className="text-center">
				<Link href={`/?c=${category._id}`}>
					<a>
						<h1>&#9654; {category.title}</h1>
					</a>
				</Link>
				<hr></hr>
			</div>
		);
	});
	return (
		<div>
			<Head>
				<title>All Categories | Yamunazon.com</title>
				<meta
          			name="description"
          			content="www.yamunazon.com, Buy best quality products at affordable price"
        			/>
        			<link rel="shortcut icon" href="/logo.jpg" type="image/x-icon" />
			</Head>
			<div>
				<hr></hr>
				{propList}
			</div>
		</div>
	);
};
export async function getServerSideProps(context) {
	const ress = await fetch(`${process.env.BASE_URL}/api/categories`);
	const data = await ress.json();
	return {
		props: { categories: data }, // will be passed to the page component as props
	};
}
export default AllCats;
