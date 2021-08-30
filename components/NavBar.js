import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import cookie from "js-cookie";

const NavBar = () => {
	const router = useRouter();
	const { state, dispatch } = useContext(DataContext);
	const { auth, cart } = state;
	const isActive = (r) => {
		if (r === router.pathname) {
			return " active";
		} else {
			return "";
		}
	};
	const handleLogout = () => {
		cookie.remove("tokenAuth");
		cookie.remove("whoU");
		dispatch({ type: "AUTH", payload: {} });
		dispatch({ type: "NOTIFY", payload: { info: "Logged Out Successfully" } });
		//router.push('/')
	};
	const loggedRouter = () => {
		return (
			<li className="nav-item dropdown">
				<span style={{marginLeft:'8px'}}></span>
				<button
					className="btn btn-danger"
					onClick={(e) => {
						handleLogout();
					}}
				>
					Log Out
				</button>
			</li>
		);
	};
	return (
		<div>
			<nav
				className="navbar navbar-expand-lg navbar-dark bg-dark navbar-main"
				style={{ position: "fixed", width: "100%", zIndex: 3 }}
			>
				<div className="container-fluid">
					{/*<Image
						src="/favicon.ico"
						width="30"
						height="30"
						className="navBrandImg"
						alt="dfd"
					/>*/}
					<span style={{ minWidth: "3px" }}></span>
					<Link href="/">
						<a className="navbar-brand navTextMain">Yamunazon</a>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse justify-content-end"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link href="/My_Cart">
									<a className={"nav-link" + isActive("/My_Cart")}>
										<i className="fas fa-shopping-cart position-relative">
											<span
												className="position-absolute"
												style={{
													padding: "3px 6px",
													background: "#fff",
													borderRadius: "50%",
													top: "-14px",
													right: "-10px",
													color: "#000",
													fontSize: "14px",
												}}
											>
												{cart.length}
											</span>
										</i>
									</a>
								</Link>
							</li>
							{Object.keys(auth).length === 0 ? (
								<li className="nav-item">
									<Link href="/User_Login">
										<a className={"nav-link" + isActive("/User_Login")}>
											<i className="fas fa-user"></i>
										</a>
									</Link>
								</li>
							) : (
								loggedRouter()
							)}
						</ul>
					</div>
				</div>
			</nav>
			<div style={{ height: "63px" }}></div>
		</div>
	);
};

export default NavBar;
