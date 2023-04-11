import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [data, setData] = useState({ username: "", password: "" });

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setData({ ...data, [name]: value });
	};

	const reset = () => {
		setData({ username: "", password: "" });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const { username, password } = data;

		const formData = {
			username,
			password,
		};

		const res = api.auth
			.login(formData)
			.then((res) => {
				if (res.status === 200) {
					reset();
					localStorage.setItem("token", res.data);
					localStorage.setItem("isLoggedIn", true);
					navigate("/home", { replace: true });
				}
			})
			.catch((err) => console.log(err));

		return res;
	};

	return (
		<>
			<h3>Login with us!!</h3>
			<form onSubmit={handleSubmit} className='m-3'>
				<label htmlFor='username'>Username</label>
				<br />
				<input
					id='username'
					name='username'
					type='text'
					value={data.username}
					onChange={handleChange}
					placeholder='Username'
					autoComplete='off'
				/>
				<br />
				<label htmlFor='password'>Password</label>
				<br />
				<input
					id='password'
					name='password'
					type='password'
					value={data.password}
					onChange={handleChange}
					placeholder='Password'
					autoComplete='off'
				/>
				<br />
				<input type='submit' value='Login' />
			</form>
		</>
	);
};

export default Login;
