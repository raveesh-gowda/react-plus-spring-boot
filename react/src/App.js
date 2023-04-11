import { Route, Routes, useNavigate } from "react-router-dom";

import PreLogin from "./routes/PreLogin";
import PostLogin from "./routes/PostLogin";

import RouteNotFound from "./routes/RouteNotFound";
import Register from "./components/Register";
import Login from "./components/Login";

import Home from "./components/Home";
import About from "./components/About";
import Container from "./components/Employees/Container";
import Add from "./components/Employees/Add";
import Edit from "./components/Employees/Edit";

function App() {
	const isLoggedIn = localStorage.getItem("isLoggedIn");

	const navigate = useNavigate();

	function onLogOut() {
		navigate("/login");
		localStorage.removeItem("isLoggedIn");
		localStorage.removeItem("token");
	}

	return (
		<>
			<div className='d-flex justify-content-between'>
				<h1>Fullstack Application POC</h1>
				{isLoggedIn && <button onClick={onLogOut}>Log Out</button>}
			</div>
			<NavBar />
		</>
	);
}

const NavBar = (props) => {
	return (
		<>
			<Routes>
				<Route element={<PreLogin />}>
					<Route path='/' element={<Register />} />
					<Route path='/login' element={<Login />} />
				</Route>

				<Route element={<PostLogin />}>
					<Route path='/home' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/employees' element={<Container />} />
					<Route path='/employees/create' element={<Add />} />
					<Route path='/employees/edit/:id' element={<Edit />} />
				</Route>

				<Route path='*' element={<RouteNotFound />} />
			</Routes>
		</>
	);
};

export default App;
