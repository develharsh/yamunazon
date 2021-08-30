import Link from "next/link";
import { decrease, increase, deleteFromCart } from "../store/Actions";
import Swal from "sweetalert2";

const CartItem = (props) => {
	const { item, dispatch, cart } = props;
	//console.log(item)
	const dealer = (cart, id, name) => {
		Swal.fire({
			title: "Remove "+name+" ?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, remove it!",
		}).then((result) => {
			if (result.isConfirmed) {
                dispatch(deleteFromCart(cart, id));
                return dispatch({ type: 'NOTIFY', payload: { success: 'Removed Successfully' } })
			}
		});
	};
	return (
		<tr>
			<td style={{ width: "100px", overflow: "hidden" }}>
				<img
					src={item.images[0]}
					alt="..."
					width="50px"
					height="50px"
					style={{ objectFit: "cover", borderRadius: "100px" }}
				/>
			</td>
			<td style={{ width: "100px", overflow: "hidden" }}>
				<Link href={`/product/${item._id}`}>
					<a>{item.title}</a>
				</Link>
				<h6 className="text-dark">
					{item.price} <span style={{ color: "blue" }}>X</span> {item.quantity}
					<br></br>₹ {item.quantity * item.price}
				</h6>
			</td>
			<td className="align-middle">
				<button
					className="btn btn-outline-dark"
					onClick={() => dispatch(decrease(cart, item._id))}
				>
					-
				</button>
				<span className="px-1">{item.quantity}</span>
				<button
					className="btn btn-outline-dark"
					onClick={() => dispatch(increase(cart, item._id))}
				>
					+
				</button>
			</td>
			<td className="align-middle">
				<i
					className="far fa-trash-alt text-danger"
					onClick={() => {
						dealer(cart, item._id, item.title);
					}}
				></i>
			</td>
		</tr>
	);
};
export default CartItem;
