import NavBar from "./NavBar";
import Head from "next/head";
import Notify from "./Notify";
import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
				/>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
				/>
				<script
					async
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js"
				></script>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
				/>
				<script
					async
					src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"
				></script>
				<script async src="https://smtpjs.com/v3/smtp.js"></script>
				<link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
			</Head>
			<NavBar />
			<Notify />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
