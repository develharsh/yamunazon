import Swal from "sweetalert2";
import { useRouter } from "next/router";
const CPasswd = (props) => {
	const router = useRouter();
	const handleResetPassword = async (password) => {
		await fetch(`${process.env.BASE_URL}/api/specificUser`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				w: props.w,
				password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.user.length !== 0) {
					Swal.fire(
						"Congratulations",
						"Successfully changed Password. Please check email for more info.",
						"success"
					);
					const { name, email, phone, _id } = data.user;
					Email.send({
						Host: "smtp.gmail.com",
						Username: "singhharshvardhan223@gmail.com",
						Password: "memxqpdrlkwwxmet",
						To: email,
						From: "singhharshvardhan223@gmail.com",
						Subject: "Password Reset Information- Yamunazon.com",
						Body:
							`<b><span style='color:purple'>Hello ${name}</span><b><br><div style='color:blue'>Below are your Updated details:</div><br>` +
							`Email: ${email}<br>Phone: ${phone}<br>Password: ${password}<br><br><span style='color:red'>Never not share this with somebody else.</span><br><br>Thanks :)`,
					}).then((message) => {});
				} else {
					Swal.fire({
						icon: "error",
						title: "Sorry",
						text: "Something went wrong!",
						footer:
							'<a href="https://wa.me/+918279766773" target="_blank">Ask us on WhatsApp</a>',
					});
				}
			});
	};
	const getPassword = () => {
		Swal.fire({
			title: "Enter New Password",
			input: "text",
			inputAttributes: {
				autocapitalize: "off",
			},
			showCancelButton: false,
			confirmButtonText: "I am sure.",
			showLoaderOnConfirm: true,
			preConfirm: (password) => {
				if (password && password.length > 5) {
					Swal.fire("Please Wait...");
					handleResetPassword(password);
				} else {
					alert("Password Must Be at least 6 chars Long.");
					router.push(`/CPasswd?w=${props.w}`);
				}
			},
			allowOutsideClick: () => {
				false;
			} /*!Swal.isLoading()*/,
			backdrop: true,
		});
	};
	getPassword();
	return <div></div>;
};
export async function getServerSideProps(context) {
	const { req, res, query } = context;
	if (!query.w) {
		res.writeHead(302, { Location: "/My_Cart" });
		res.end();
	}
	return {
		props: { w: query.w }, // will be passed to the page component as props
	};
}
export default CPasswd;
