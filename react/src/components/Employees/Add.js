import React from "react";

import Form from "./Form";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

const Add = () => {
	const navigate = useNavigate();

	const formSubmission = (formData, reset) => {
		api.employees
			.create(formData)
			.then((res) => {
				if (res.status === 201) {
					reset();
					navigate("/employees");
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h4>Create Employee</h4>
			<Form buttonName='Create' formSubmission={formSubmission} />
		</div>
	);
};

export default Add;
