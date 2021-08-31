import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import Link from "next/link";
import Swal from "sweetalert2";

const My_Cart = () => {
	const { state, dispatch } = useContext(DataContext);
	const { cart, auth } = state;
	const [total, setTotal] = useState(0);

	const initialState = { phone: "", address: "" };
	const [userData, setUserData] = useState(initialState);
	const { phone, address } = userData;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
		dispatch({ type: "NOTIFY", payload: {} });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const errMsg = !phone || !address;
		if (errMsg) {
			return dispatch({
				type: "NOTIFY",
				payload: { fail: "Please fill all details." },
			});
		}
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
					<title>My Cart | Dusk and Dawn</title>
				</Head>
				<div className="container">
					<marquee direction="left" scrollamount="15">
						<h2 className="text-danger">Sorry, No Items in you Cart.</h2>
					</marquee>
					<h2 className="text-info">Please add items.</h2>
					<div style={{ height: "350px" }}></div>
				</div>
			</div>
		);
	}
	return (
		<div>
			<Head>
				<title>My Cart | Dusk and Dawn</title>
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
							<th></th>
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
						<label htmlFor="address">Proper Address</label>
						<input
							type="text"
							name="address"
							value={address}
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
