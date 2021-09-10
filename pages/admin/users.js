import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import jwt from 'jsonwebtoken'

const Users = ({ users }) => {
	const router = useRouter();
	const propList = users.map((user) => {
		return (
			<tr key={user._id}>
				<th>{user.name.substring(0, 20)}...</th>

				<td>{user.phone}</td>
				<td>{user.email}</td>
			</tr>
		);
	});
	return (
		<div>
			<Head>
				<title>Admin Users | Yamunazon.com</title>
			</Head>
			<div className="container" style={{overflow:'auto'}}>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Phone</th>
							<th>Email</th>
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
	const ress = await fetch(`${process.env.BASE_URL}/api/user/users`);
	const users = await ress.json();
	return {
		props: { users }, // will be passed to the page component as props
	};
}
export default Users;
