import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsStat, trashProducts } from '../../services/apiService';

const initialState = {
	productsScreen: 'default',
	isProductsStatLoading: false,
	isProductsTrashing: false,
	allProducts: 0,
	trashedProducts: 0
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setIsProductsTrashing: (state, action) => {
			state.isProductsTrashing = action.payload
		}
	},
	extraReducers: (builder) => {
        builder.addCase(fetchProductsStat.pending, (state) => {
			state.isProductsStatLoading = true;
		}),
		builder.addCase(fetchProductsStat.fulfilled, (state, action) => {
            state.isProductsStatLoading = false;
			state.allProducts = action.payload.total;
			state.trashedProducts = action.payload.trash;
		}),
		builder.addCase(fetchProductsStat.rejected, (state, action) => {
			state.isProductsStatLoading = false;
			// state.amazonApiConnectionStatus = 'error';
			// state.amazonApiConnectionMessage = action.payload?.message ? action.payload.message : 'Unable to connect to the API.';
        }),
        builder.addCase(trashProducts.pending, (state) => {
			state.isProductsTrashing = true;
		}),
		builder.addCase(trashProducts.fulfilled, (state, action) => {
            state.isProductsTrashing = false;
			state.allProducts = action.payload.stat.total;
			state.trashedProducts = action.payload.stat.trash;
		}),
		builder.addCase(trashProducts.rejected, (state, action) => {
			state.isProductsTrashing = false;
		})
	}
})

export const { setIsProductsTrashing } = productsSlice.actions
export default productsSlice.reducer;