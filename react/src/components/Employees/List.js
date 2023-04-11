import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

const List = () => {
	const [data, setData] = useState([]);

	const navigate = useNavigate();

	const getAllEmployees = () => {
		api.employees
			.getAll()
			.then((res) => {
				if (res.status === 200) {
					setData(res.data);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getAllEmployees();
	}, []);

	const handleEdit = (id) => {
		navigate(`/employees/edit/${id}`);
	};

	const handleRemove = (id) => {
		api.employees
			.delete(id)
			.then((res) => {
				if (res.status === 200) {
					getAllEmployees();
				}
			})
			.catch((err) => console.log(err));
	};

	const handleRemoveAll = () => {
		api.employees
			.deleteAll()
			.then((res) => {
				if (res.status === 200) {
					getAllEmployees();
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='m-3'>
			<h3>Employees List</h3>
			{data.length > 0 && (
				<button onClick={handleRemoveAll}>Remove All</button>
			)}
			{data.length === 0 ? (
				<p>No records found</p>
			) : (
				<table className='table table-bordered'>
					<thead>
						<tr>
							<th>Sl.no</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Age</th>
							<th>DOB</th>
							<th>Contact</th>
							<th>Email</th>
							<th>Father Name</th>
							<th>Mother Name</th>
							<th>Address</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{data.map((ele, i) => {
							return (
								<tr key={ele.id}>
									<td>{i}</td>
									<td>{ele.firstName}</td>
									<td>{ele.lastName}</td>
									<td>{ele.age}</td>
									<td>{ele.dob}</td>
									<td>{ele.contact}</td>
									<td>{ele.email}</td>
									<td>{ele.fatherName}</td>
									<td>{ele.motherName}</td>
									<td>{ele.address}</td>
									<td
										style={{
											display: "flex",
											justifyContent: "space-evenly",
										}}
									>
										<button onClick={() => handleEdit(ele.id)}>
											Edit
										</button>
										<button onClick={() => handleRemove(ele.id)}>
											Remove
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default List;
