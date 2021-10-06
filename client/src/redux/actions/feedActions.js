import axios from "axios";
import { URL, tokenConfig } from "./userActions";
import {
	GET_FEEDS,
	DELETE_FEED,
	UPDATE_FEED,
	ADD_FEED,
	FEEDS_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";

export const getFeeds = () => {
	return async (dispatch, getState) => {
		dispatch(setFeedsLoading());
		try {
			const res = await axios.get(`${URL}/feeds`, tokenConfig(getState));
			dispatch({
				type: GET_FEEDS,
				payload: res.data,
			});
		} catch (error) {
			console.log(error.response);
			dispatch(returnErrors(error.response?.data, error.response?.status));
		}
	};
};
export const addFeeds = (data) => {
	return async (dispatch, getState) => {
		try {
			const res = await axios.post(`${URL}/feeds`, data, tokenConfig(getState));
			dispatch({
				type: ADD_FEED,
				payload: res.data,
			});
		} catch (error) {
			dispatch(returnErrors(error.response.data, error.response.status));
		}
	};
};
export const deleteFeeds = (id) => {
	return async (dispatch, getState) => {
		try {
			await axios.delete(`${URL}/feeds/${id}`, tokenConfig(getState));
			dispatch({
				type: DELETE_FEED,
				payload: id,
			});
		} catch (error) {
			dispatch(returnErrors(error.response.data, error.response.status));
		}
	};
};
export const updateFeed = (data) => {
	return async (dispatch, getState) => {
		try {
			const res = await axios.put(`${URL}/feeds/`, data, tokenConfig(getState));
			dispatch({
				type: UPDATE_FEED,
				payload: data,
			});
		} catch (error) {
			dispatch(returnErrors(error.response.data, error.response.status));
		}
	};
};
export const setFeedsLoading = () => {
	return {
		type: FEEDS_LOADING,
	};
};
