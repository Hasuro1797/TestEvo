import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	USER_LOADING,
} from "./types";
export const URL = "http://localhost:3001";

export const loadUser = () => {
	return async (dispatch, getState) => {
		dispatch({ type: USER_LOADING });
		try {
			const res = await axios.get(`${URL}/user`, tokenConfig(getState));
			console.log("el res es", res.data);
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (error) {
			console.log(error.response);
			dispatch({
				type: AUTH_ERROR,
			});
			dispatch(returnErrors(error.response?.data, error.response?.status));
		}
	};
};

export const logInUser = (data) => {
	return async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post(`${URL}/user/login`, data, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
			dispatch(clearErrors());
		} catch (error) {
			dispatch({
				type: LOGIN_FAIL,
			});
			dispatch(
				returnErrors(error.response?.data, error.response?.status, "LOGIN_FAIL")
			);
		}
	};
};
export const registerUser = (data) => {
	return async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post(`${URL}/user/register`, data, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
			});
			dispatch(
				returnErrors(
					error.response.data,
					error.response.status,
					"REGISTER_FAIL"
				)
			);
		}
	};
};

export const logOut = () => {
	return {
		type: LOGOUT_SUCCESS,
	};
};

export const tokenConfig = (getState) => {
	const token = getState().auth.token;
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}

	return config;
};
