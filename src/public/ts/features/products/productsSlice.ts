import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import appLocalizer from '../../types/global';

// Define a type for the slice state
interface ProductStatType {
	total: number,
	trash: number
}

// Define a type for the slice state
interface ProductsState {
	isProductStatLoading: boolean,
	isProductsMovingToTrash: boolean,
	isProductsRestoring: boolean,
	allProducts: number | null,
	trashedProducts: number | null,
	error: string | null,
	message: string,
	allTabMessage: string,
	trashTabMessage: string
}

// Define the initial state using that type
const initialState: ProductsState = {
	isProductStatLoading: false,
	isProductsMovingToTrash: false,
	isProductsRestoring: false,
	allProducts: null,
	trashedProducts: null,
	error: null,
	message: '',
	allTabMessage: '',
	trashTabMessage: ''
}

export const fetchProductStat = createAsyncThunk('products/fetchProductStat', async () => {
	const productStatURL = `${appLocalizer.apiUrl}/dwp/v1/settings`;
	const res = await axios.get(productStatURL);
	return res.data;
});

export const deleteProductsPermanently = createAsyncThunk('products/deleteProductsPermanently', async () => {
	const deleteURL = `${appLocalizer.apiUrl}/dwp/v1/delete`;
	const res = await axios.post(deleteURL, {}, {
		headers: {
			'content-type': 'application/json',
			'X-WP-NONCE': appLocalizer.nonce
		}
	});
	return res.data;
});

export const moveProductsToTrash = createAsyncThunk('products/moveProductsToTrash', async () => {
	const deleteURL = `${appLocalizer.apiUrl}/dwp/v1/settings`;
	const res = await axios.post(deleteURL, {}, {
		headers: {
			'content-type': 'application/json',
			'X-WP-NONCE': appLocalizer.nonce
		}
	});
	return res.data;
});

export const restoreTrashedProducts = createAsyncThunk('products/restoreTrashedProducts', async () => {
	const deleteURL = `${appLocalizer.apiUrl}/dwp/v1/settings`;
	const res = await axios.post(deleteURL, { action: 'restore-trash' }, {
		headers: {
			'content-type': 'application/json',
			'X-WP-NONCE': appLocalizer.nonce
		}
	});
	return res.data;
});

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
		},
		setAllTabMessage: (state, action: PayloadAction<string>) => {
			state.allTabMessage = action.payload;
		},
		setTrashTabMessage: (state, action: PayloadAction<string>) => {
			state.trashTabMessage = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProductStat.pending, (state) => {
			state.isProductStatLoading = true;
		}),
			builder.addCase(fetchProductStat.fulfilled, (state, action: PayloadAction<ProductStatType>) => {
				state.isProductStatLoading = false;
				state.allProducts = action.payload.total;
				state.trashedProducts = action.payload.trash;
				state.error = null;
			}),
			builder.addCase(fetchProductStat.rejected, (state, action) => {
				state.isProductStatLoading = false;
				state.error = (action.error?.message) ? action.error.message : null;
			}),
			builder.addCase(moveProductsToTrash.pending, (state) => {
				state.isProductsMovingToTrash = true;
			}),
			builder.addCase(moveProductsToTrash.fulfilled, (state, action: PayloadAction<ProductStatType>) => {
				state.isProductsMovingToTrash = false;
				state.allProducts = action.payload.total;
				state.trashedProducts = action.payload.trash;
				state.error = null;
				state.allTabMessage = 'All products have been successfully moved to trash';
				state.trashTabMessage = '';
			}),
			builder.addCase(moveProductsToTrash.rejected, (state, action) => {
				state.isProductsMovingToTrash = false;
				state.error = (action.error?.message) ? action.error.message : null;
			}),
			builder.addCase(restoreTrashedProducts.pending, (state) => {
				state.isProductsRestoring = true;
			}),
			builder.addCase(restoreTrashedProducts.fulfilled, (state, action: PayloadAction<ProductStatType>) => {
				state.isProductsRestoring = false;
				state.allProducts = action.payload.total;
				state.trashedProducts = action.payload.trash;
				state.error = null;
				state.allTabMessage = '';
				state.trashTabMessage = 'All products have been moved from trash';
			}),
			builder.addCase(restoreTrashedProducts.rejected, (state, action) => {
				state.isProductsRestoring = false;
				state.error = (action.error?.message) ? action.error.message : null;
			})
	}
})

// Action creators are generated for each case reducer function
export const { setMessage, setAllTabMessage, setTrashTabMessage } = productsSlice.actions

export default productsSlice.reducer