import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import Link from "next/link";
import Swal from "sweetalert2";
import $ from "jquery";

const My_Cart = () => {
	const { state, dispatch } = useContext(DataContext);
	const { cart, auth } = state;
	const [total, setTotal] = useState(0);

	const initialState = {
		name: "",
		phone: "",
		city: "",
		strcol: "",
		statee: "",
		pincode: "",
		nearby: "",
		flhbld: "",
	};
	const [userData, setUserData] = useState(initialState);
	const { phone, name, city, strcol, statee, pincode, nearby, flhbld } =
		userData;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
		dispatch({ type: "NOTIFY", payload: {} });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const errMsg =
			!phone ||
			!name ||
			!city ||
			!strcol ||
			!statee ||
			!pincode ||
			!nearby ||
			!flhbld;
		if (errMsg) {
			return dispatch({
				type: "NOTIFY",
				payload: { fail: "Please fill all details." },
			});
		}
		/*SMS START*/
		let data = "ORDER ALERT:";
		cart.forEach((item) => {
			data +=
				"<br>Link: https://yamunazon.com/product?s=" +
				item._id +
				"<br>Image: " +
				item.images[0] +
				"<br>Quantity: " +
				item.quantity +
				"<br>";
		});
		data +=
			"<br>By: <br> Name: " +
			"Harsh" +
			" <br> Phone: " +
			phone +
			"<br>City: " +
			city +
			"<br>Street/Col.: " +
			strcol +
			"<br>State: " +
			statee +
			"<br>PIN: " +
			pincode +
			"<br>LandMark: " +
			nearby +
			"<br>Flat/House/Building: " +
			flhbld;
		var settings = {
			async: true,
			crossDomain: true,
			url:
				"https://www.fast2sms.com/dev/bulkV2?authorization=fTq7l8GOxDwacFtkEdMmW5ebVYSIpRAh4nJgus20rNLPXjKHUB8ujhY1GlfsNvFD72mZ0S6x3o9pHBIV&sender_id=TXTIND&message=" +
				"YAMUNAZON ORDER ALERT ON EMAIL." +
				"&route=v3&numbers=8279766773",
			method: "GET",
		};

		$.ajax(settings).done(function (response) {
			//console.log(response);
		});
		//console.log(data);
		Email.send({
			Host: "smtp.gmail.com",
			Username: "singhharshvardhan223@gmail.com",
			Password: "memxqpdrlkwwxmet",
			To: "pmasale1986@gmail.com",
			From: "singhharshvardhan223@gmail.com",
			Subject: "Order Alert through website",
			Body: data,
		}).then((message) => {});
		/*SMS END*/
		Swal.fire(
			"Congratulations",
			"Details Submitted Successfully, We will contact you soon.",
			"success"
		);
		dispatch({ type: "ADD_CART", payload: [] });
	};
	useEffect(() => {
		const getTotal = () => {
			const res = cart.reduce((prev, item) => {
				return prev + item.price * item.quantity;
			}, 0);
			setTotal(res);
		};
		getTotal();
	}, [cart]);
	if (cart.length === 0) {
		return (
			<div>
				<Head>
					<title>My Cart | Yamunazon</title>
					<meta
						name="description"
						content="www.yamunazon.com, Buy best quality products at affordable price"
						/>
						<link rel="shortcut icon" href="/logo.jpg" type="image/x-icon" />
				</Head>
				<div>
					<h2 className="text-center mt-5">
						<i className="far fa-frown"></i> No items in your Cart.
					</h2>
					<div style={{ height: "200px" }}></div>
				</div>
			</div>
		);
	}
	return (
		<div>
			<Head>
				<title>My Cart | Yamunazon.com</title>
			</Head>
			<div className="row mx-auto">
				<div className="col-md-8 text-secondary table-responsive my-3">
					<h2>Shopping Cart</h2>
					<h6 className="text-primary">Click Product Name to view</h6>
					<table className="table my-3">
						<thead>
							<th>Image</th>
							<th>SubTotal</th>
							<th>Quantity</th>
						</thead>
						<tbody>
							{cart.map((item) => (
								<CartItem
									key={item._id}
									item={item}
									dispatch={dispatch}
									cart={cart}
								/>
							))}
						</tbody>
					</table>
				</div>
				<div className="col-md-4 my-3 text-right text-uppercase text-secondary">
					<h3>
						Total: <span className="text-dark">₹ {total}</span>
					</h3>
					<form>
						<h2>Shipping Details</h2>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							value={name}
							onChange={(e) => {
								handleChangeInput(e);
							}}
							className="form-control mb-2"
						/>
						<label htmlFor="phone">Phone</label>
						<input
							type="text"
							name="phone"
							value={phone}
							onChange={(e) => {
								handleChangeInput(e);
							}}
							className="form-control mb-2"
						/>
						<label htmlFor="flhbld">Flat No./House No./Building Name</label>
						<input
							type="text"
							name="flhbld"
							value={flhbld}
							onChange={(e) => {
								handleChangeInput(e);
							}}
							className="form-control mb-2"
						/>
						<label htmlFor="strcol">Street/Colony</label>
						<input
							type="text"
							name="strcol"
							value={strcol}
							onChange={(e) => {
								handleChangeInput(e);
							}}
							className="form-control mb-2"
						/>
						<label htmlFor="nearby">Land Mark</label>
						<input
							type="text"
							name="nearby"
							value={nearby}
							onChange={(e) => {
								handleChangeInput(e);
							}}
							className="form-control mb-2"
						/>
						<label htmlFor="city">City</label>
						<input
							type="text"
							name="city"
							value={city}
							onChange={(e) => {
								handleChangeInput(e);
							}}
							className="form-control mb-2"
						/>

						<label htmlFor="statee">State</label>
						<input
							type="text"
							name="statee"
							value={statee}
							onChange={(e) => {
								handleChangeInput(e);
							}}
							className="form-control mb-2"
						/>
						<label htmlFor="pincode">PIN Code</label>
						<input
							type="text"
							name="pincode"
							value={pincode}
							onChange={(e) => {
								handleChangeInput(e);
							}}
							className="form-control mb-2"
						/>

						<button
							type="submit"
							className="btn btn-dark"
							onClick={(e) => {
								handleSubmit(e);
							}}
						>
							<i className="far fa-credit-card"></i> Check Out
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
export default My_Cart;
