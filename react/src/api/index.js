import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const client = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Credentials": true,
		"Access-Control-Allow-Origin": "*",
	},
});

const getAuthToken = () => {
	return localStorage.getItem("token");
};

client.interceptors.request.use(
	(config) => {
		config.headers = {
			...config.headers,
			Authorization:
				getAuthToken() === null ? "" : `Bearer ${getAuthToken()}`
		};
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const requests = {
	get: (url) => client.get(url),
	post: (url, data) => client.post(url, data),
	put: (url, data) => client.put(url, data),
	patch: (url, data) => client.patch(url, data),
	delete: (url) => client.delete(url),
};

const auth = {
	register: (data) => requests.post("user/register", data),
	login: (data) => requests.post("user/login", data),
};

const employees = {
	getAll: () => requests.get("/employees/all"),
	getById: (id) => requests.get(`/employees/${id}`),
	create: (data) => requests.post("/employees/create", data),
	update: (id, data) => requests.put(`/employees/update/${id}`, data),
	delete: (id) => requests.delete(`/employees/delete/${id}`),
	deleteAll: () => requests.delete("employees/delete/all"),
};

export const api = {
	auth,
	employees,
};
