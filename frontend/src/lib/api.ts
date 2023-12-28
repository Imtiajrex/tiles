export const API_URL = "http://localhost:3000/";
import axios from "axios";
export const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
