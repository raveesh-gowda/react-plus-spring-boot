import React from "react";
import { Link } from "react-router-dom";

import List from "./List";

const Container = () => {
	return (
		<div>
			<Link to='/employees/create'>Create Employee</Link>
			<List />
		</div>
	);
};

export default Container;
