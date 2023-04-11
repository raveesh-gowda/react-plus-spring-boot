import { Link, Navigate, Outlet } from "react-router-dom";

const PreLogin = () => {
	const auth = JSON.parse(localStorage.getItem("auth"));

	if (auth) {
		return <Navigate to='/profile' replace />;
	}

	return (
		<>
			<div style={{ display: "flex", justifyContent: "space-evenly" }}>
				<Link to='/'>Register</Link>
				<Link to='/login'>Login</Link>
			</div>
			<Outlet />
		</>
	);
};

export default PreLogin;
