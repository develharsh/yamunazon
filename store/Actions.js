import Swal from "sweetalert2";

export const ACTIONS = {
	NOTIFY: "NOTIFY",
	AUTH: "AUTH",
	ADD_CART: "ADD_CART",
};

export const addToCart = (product, cart) => {
	// if (product.available === 0) {
	//     return ({ type: 'NOTIFY', payload: { info: 'This product is Unavailable Currently.' } })
	// }
	let countt = 0;
	const check = cart.every((item) => {
		++countt;
		return item._id !== product._id;
	});
	if (countt === 99) {
		return {
			type: "NOTIFY",
			payload: { info: "Already 99 items pending for checkout." },
		};
	}
	if (!check) {
		return {
			type: "NOTIFY",
			payload: { info: "This product Already in the Cart" },
		};
	}
	Swal.fire("Added Successfully.");
	return { type: "ADD_CART", payload: [...cart, { ...product, quantity: 1 }] };
};

export const decrease = (data, id) => {
	const newData = [...data];
	newData.forEach((item) => {
		if (item._id === id) {
			if (item.quantity <= 1) {
				Swal.fire("Please click on delete button at right to remove this.");
				item.quantity = 1;
				return;
			}
			item.quantity -= 1;
		}
	});
	return { type: "ADD_CART", payload: newData };
};

export const increase = (data, id) => {
	const newData = [...data];
	newData.forEach((item) => {
		if (item._id === id) {
			if (item.quantity >= 9) {
				Swal.fire("Sorry, First Checkout with 9 quantities.");
				item.quantity = 9;
				return;
			}
			item.quantity += 1;
		}
	});
	return { type: "ADD_CART", payload: newData };
};
export const deleteFromCart = (data, id) => {
	data = data.filter((i) => i._id !== id);
	const newData = [...data];
	return { type: "ADD_CART", payload: newData };
};
