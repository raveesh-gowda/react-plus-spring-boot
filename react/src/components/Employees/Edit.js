import React, { useEffect, useState } from "react";

import Form from "./Form";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";
import { isObjectEmpty } from "../../utils/helpers";

const Edit = () => {
	const [data, setData] = useState({});

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		api.employees
			.getById(id)
			.then((res) => {
				if (res.status === 200) {
					setData(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, [id]);

	const formSubmission = (formData, reset) => {
		api.employees
			.update(id, formData)
			.then((res) => {
				if (res.status === 200) {
					navigate("/employees");
					reset();
				}
			})
			.catch((err) => console.log(err));
	};

	if (isObjectEmpty(data)) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h4>Edit Employee</h4>
			<Form data={data} formSubmission={formSubmission} buttonName='Edit' />
		</div>
	);
};

export default Edit;
