import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsStat = createAsyncThunk('products/stat', async (params, { rejectWithValue }) => {
	try{
		const res = await axios.get(daprodsDeleteAllProducts.restEndpoint.productsStat, {
			params,
			headers: {
				'content-type': 'application/json',
				'X-WP-NONCE': daprodsDeleteAllProducts.restNonce
			}
		});
		return res.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const trashProducts = createAsyncThunk('products/trash', async (params, { rejectWithValue }) => {
	try{
		const res = await axios.delete(daprodsDeleteAllProducts.restEndpoint.productsTrash, {
			params,
			headers: {
				'content-type': 'application/json',
				'X-WP-NONCE': daprodsDeleteAllProducts.restNonce
			}
		});
		return res.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const deleteProducts = createAsyncThunk('products/delete', async (params, { rejectWithValue }) => {
	try{
		const res = await axios.delete(daprodsDeleteAllProducts.restEndpoint.productsDelete, {
			params,
			headers: {
				'content-type': 'application/json',
				'X-WP-NONCE': daprodsDeleteAllProducts.restNonce
			}
		});
		return res.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const restoreProducts = createAsyncThunk('products/restore', async (data, { rejectWithValue }) => {
	try{
		const res = await axios.post(daprodsDeleteAllProducts.restEndpoint.productsRestore, data, {
			headers: {
				'content-type': 'application/json',
				'X-WP-NONCE': daprodsDeleteAllProducts.restNonce
			}
		});
		return res.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const fetchSettings = createAsyncThunk('fetchSettings', async (params, { rejectWithValue }) => {
	try{
		const res = await axios.get(daprodsDeleteAllProducts.restEndpoint.settings, {
			headers: {
				'content-type': 'application/json',
				'X-WP-NONCE': daprodsDeleteAllProducts.restNonce
			}
		});
		return res.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const saveSettings = createAsyncThunk('saveSettings', async (data, { rejectWithValue }) => {
	try{
		const res = await axios.post(daprodsDeleteAllProducts.restEndpoint.settings, data, {
			headers: {
				'content-type': 'application/json',
				'X-WP-NONCE': daprodsDeleteAllProducts.restNonce
			}
		});
		return res.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});