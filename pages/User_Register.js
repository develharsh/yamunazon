import Head from "next/head";
import Link from "next/link";
import { useState, useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { useRouter } from "next/router";
//import $ from 'jquery';
import Swal from "sweetalert2";

const User_Register = () => {
	const router = useRouter();
	const initialState = {
		name: "",
		email: "",
		phone: "",
		password: "",
	};
	const [userData, setUserData] = useState(initialState);
	const { name, email, phone, password } = userData;
	const { state, dispatch } = useContext(DataContext);

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
		dispatch({ type: "NOTIFY", payload: {} });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const errMsg = !name || !email || !phone || !password;
		if (errMsg) {
			return dispatch({
				type: "NOTIFY",
				payload: { fail: "Please fill all details." },
			});
		}
		dispatch({ type: "NOTIFY", payload: { loading: true } });
		/*var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.fast2sms.com/dev/bulkV2?authorization=gDBoVRk9vSz3xmeb1whCsF0PypEiu8IKTZ5tMfJQLY6OXc7HGncb23mlerwSqHogfkMDhsGBzIT8Q4pW&message=" + password + "&language=english&route=q&numbers=6398188216",
            "method": "GET"
        }
        $.ajax(settings).done(function (response) {
            //console.log(response);
        });*/
		let res = await fetch(`${process.env.BASE_URL}/api/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				phone,
				password,
				email,
				name,
			}),
		});
		res = await res.json();
		if (res.fail) {
			return dispatch({ type: "NOTIFY", payload: { fail: res.fail } });
		}
		dispatch({ type: "NOTIFY", payload: {} });
		Swal.fire("Successfully Registered, Please Login Now.");
		router.push("/User_Login");
	};
	return (
		<div>
			<Head>
				<title>New User | Yamunazon.com</title>
				<meta
						name="description"
						content="www.yamunazon.com, Buy best quality products at affordable price"
        			/>
        			<link rel="shortcut icon" href="/logo.jpg" type="image/x-icon" />
			</Head>
			<form className="User_Register_Form" onSubmit={handleSubmit}>
				<h4 className="UserLogRegtext">New User</h4>
				<h5>
					<span className="text-info">Welcome :)</span>
					<br></br>
					<span className="text-info signupNameArt">{name}</span>
				</h5>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name:
					</label>
					<input
						type="text"
						maxLength="30"
						className="form-control"
						name="name"
						value={name}
						onChange={handleChangeInput}
						id="name"
						aria-describedby="emailHelp"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="phone" className="form-label">
						Phone:
					</label>
					<input
						type="text"
						maxLength="10"
						minLength="10"
						className="form-control"
						name="phone"
						value={phone}
						onChange={handleChangeInput}
						id="phone"
						aria-describedby="emailHelp"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Email:
					</label>
					<input
						type="email"
						className="form-control"
						name="email"
						value={email}
						onChange={handleChangeInput}
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Password:
					</label>
					<input
						type="password"
						className="form-control"
						name="password"
						value={password}
						onChange={handleChangeInput}
						id="exampleInputPassword1"
					/>
				</div>

				<button type="submit" className="btn btn-dark">
					Register Me
				</button>
				<div style={{ marginTop: "20px" }}></div>
				<p>
					<Link href="/User_Login">
						<a style={{ color: "crimson", fontWeight: "bold" }}>
							Already User?
						</a>
					</Link>
				</p>
			</form>
		</div>
	);
};
export default User_Register;
