import React, { useState } from "react";

const Form = (props) => {
	const { data: editData, buttonName, formSubmission } = props;

	const [data, setData] = useState({
		fName: editData?.firstName ? editData?.firstName : "",
		lName: editData?.lastName ? editData?.lastName : "",
		age: editData?.age ? editData?.age : "",
		dob: editData?.dob ? editData?.dob : "",
		email: editData?.email ? editData?.email : "",
		contact: editData?.contact ? editData?.contact : "",
		fatherName: editData?.fatherName ? editData?.fatherName : "",
		motherName: editData?.motherName ? editData?.motherName : "",
		address: editData?.address ? editData?.address : "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setData({ ...data, [name]: value });
	};

	const reset = () => {
		setData({
			fName: "",
			lName: "",
			age: "",
			dob: "",
			email: "",
			contact: "",
			fatherName: "",
			motherName: "",
			spouseName: "",
			address: "",
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const {
			fName,
			lName,
			age,
			dob,
			email,
			contact,
			fatherName,
			motherName,
			address,
		} = data;

		const formData = {
			firstName: fName,
			lastName: lName,
			dob,
			age: Number(age),
			contact,
			email,
			fatherName,
			motherName,
			address,
		};

		formSubmission(formData, reset);
	};

	return (
		<div className='m-3'>
			<form onSubmit={handleSubmit}>
				<p>Personal Details</p>
				{/* <br /> */}
				<label htmlFor='fName'>First Name</label>
				<br />
				<input
					id='fName'
					type='text'
					placeholder='First Name'
					name='fName'
					value={data.fName}
					onChange={handleChange}
					autoComplete='off'
				/>
				<br />
				<label htmlFor='lName'>Last Name</label>
				<br />
				<input
					id='lName'
					type='text'
					placeholder='Last Name'
					name='lName'
					value={data.lName}
					onChange={handleChange}
					autoComplete='off'
				/>
				<br />
				<label htmlFor='dob'>Date of Birth</label>
				<br />
				<input
					id='dob'
					type='date'
					placeholder='Date of Birth'
					name='dob'
					value={data.dob}
					onChange={handleChange}
					autoComplete='off'
				/>
				<br />
				<label htmlFor='age'>Age</label>
				<br />
				<input
					id='age'
					type='text'
					placeholder='Age'
					name='age'
					value={data.age}
					onChange={handleChange}
					autoComplete='off'
				/>
				<br />
				<label html='email'>Email</label>
				<br />
				<input
					id='email'
					type='text'
					placeholder='Email'
					name='email'
					value={data.email}
					onChange={handleChange}
					autoComplete='off'
				/>
				<br />
				<label htmlFor='contact'>Contact</label>
				<br />
				<input
					id='contact'
					type='text'
					placeholder='Contact'
					name='contact'
					value={data.contact}
					onChange={handleChange}
					autoComplete='off'
				/>
				<br />
				<hr />
				<p>Family Details</p>
				<label htmlFor='fatherName'>Father Name</label>
				<br />
				<input
					id='fatherName'
					type='text'
					placeholder='Father Name'
					name='fatherName'
					value={data.fatherName}
					onChange={handleChange}
					autoComplete='off'
				/>
				<br />
				<label htmlFor='motherName'>Mother Name</label>
				<br />
				<input
					id='motherName'
					type='text'
					placeholder='Mother Name'
					name='motherName'
					value={data.motherName}
					onChange={handleChange}
					autoComplete='off'
				/>
				<br />
				<hr />
				<p>Residential Details</p>
				<label htmlFor='address'>Address</label>
				<br />
				<textarea
					id='address'
					type='text'
					placeholder='Address'
					name='address'
					value={data.address}
					onChange={handleChange}
					autoComplete='off'
				></textarea>
				<br />
				<input type='submit' value={buttonName} />
			</form>
		</div>
	);
};

export default Form;
