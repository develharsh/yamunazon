import Link from "next/link";
const Footer = () => {
	return (
		<div style={{marginTop:'200px'}}>
			<footer className="text-center text-lg-start bg-dark text-light">
				<section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
					<div className="me-5 d-none d-lg-block">
						<span>Get connected with us on Social Networks:</span>
					</div>

					<div>
						<a href="" className="me-4 text-reset">
							<i className="fab fa-facebook-f"></i>
						</a>
						<a href="" className="me-4 text-reset">
							<i className="fab fa-twitter"></i>
						</a>
						<a href="" className="me-4 text-reset">
							<i className="fab fa-google"></i>
						</a>
						<a href="" className="me-4 text-reset">
							<i className="fab fa-instagram"></i>
						</a>
						<a href="" className="me-4 text-reset">
							<i className="fab fa-linkedin"></i>
						</a>
						<a href="" className="me-4 text-reset">
							<i className="fab fa-github"></i>
						</a>
					</div>
				</section>

				<section className="">
					<div className="container text-center text-md-start mt-5">
						<div className="row mt-3">
							<div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
								<h6 className="text-uppercase fw-bold mb-4">
									<i className="fas fa-gem me-3"></i>Yamunazon
								</h6>
								<p>Sample jahfjhjsdhfjkhsdfjkhjkdsf</p>
							</div>

							<div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
								<h6 className="text-uppercase fw-bold mb-4">Products</h6>
								<p>
									<Link href="/User_Register">
										<a className="text-reset">New User</a>
									</Link>
								</p>
								<p>
									<Link href="/User_Login">
										<a className="text-reset">Already User</a>
									</Link>
								</p>
                                <p>
									<Link href="/My_Cart">
										<a className="text-reset">My Cart</a>
									</Link>
								</p>
							</div>

							<div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
								<h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
								<p>
									<Link href="/">
										<a className="text-reset">Products</a>
									</Link>
								</p>
								<p>
									<a href="#!" className="text-reset">
										About Us
									</a>
								</p>
								<p>
									<a href="#!" className="text-reset">
										Issues
									</a>
								</p>
								<p>
									<a href="#!" className="text-reset">
										Help
									</a>
								</p>
							</div>

							<div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
								<h6 className="text-uppercase fw-bold mb-4">Contact</h6>
								<p>
									<i className="fas fa-home me-3"></i> Mathura, U.P India
								</p>
								<p>
									<i className="fas fa-envelope me-3"></i>
									pmasale1986@gmail.com
								</p>
								<p>
									<i className="fas fa-phone me-3"></i> +91-8279766773
								</p>
								<p>
									<i className="fas fa-print me-3"></i> + 01 234 567 89
								</p>
							</div>
						</div>
					</div>
				</section>

				<div className="text-center p-4 bg-dark">
					© 2021 Copyright:
					<a className="text-reset fw-bold" href="https://yamunazon.com/">
						Yamunazon.com
					</a>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
