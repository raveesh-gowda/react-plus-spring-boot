import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const Register = () => {
	const [data, setData] = useState({
		username: "",
		age: "",
		dob: "",
		password: "",
	});
	// const [error, setError] = useState({});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setData({ ...data, [name]: value });
	};

	const reset = () => {
		setData({ username: "", age: "", dob: "", password: "" });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const { username, age, password, dob } = data;

		const formData = {
			username,
			password,
			age: Number(age),
			dob,
		};

		const res = api.auth
			.register(formData)
			.then((res) => {
				if (res.status === 201) {
					reset();
					navigate("/login");
				}
			})
			.catch((err) => console.log(err));

		return res;
	};

	return (
		<>
			<h3>Register with us!!</h3>
			{/* {error.length > 0
				? error.map((ele, i) => (
						<div key={i}>
							<p style={{ color: "red" }}>{ele.defaultMessage}</p>
						</div>
				  ))
				: null} */}
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
				<label htmlFor='age'>Age</label>
				<br />
				<input
					id='age'
					name='age'
					type='text'
					value={data.age}
					onChange={handleChange}
					placeholder='Age'
					autoComplete='off'
				/>
				<br />
				<label htmlFor='dob'>Date of Birth</label>
				<br />
				<input
					id='dob'
					name='dob'
					type='date'
					value={data.dob}
					onChange={handleChange}
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
				<input type='submit' value='Register' />
			</form>
		</>
	);
};

export default Register;
