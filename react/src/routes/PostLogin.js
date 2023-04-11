import { Navigate, useLocation, Outlet, Link } from "react-router-dom";

const PostLogin = () => {
	const location = useLocation();
	const isLoggedIn = localStorage.getItem("isLoggedIn");

	if (!isLoggedIn) {
		return <Navigate to='/login' replace state={{ from: location }} />;
	}

	return (
		<>
			<div style={{ display: "flex", justifyContent: "space-evenly" }}>
				<Link to='/home'>Home</Link>
				<Link to='/about'>About</Link>
				<Link to='/employees'>Employees</Link>
			</div>
			<Outlet />
		</>
	);
};

export default PostLogin;
