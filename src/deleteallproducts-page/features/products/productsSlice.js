import { createSlice } from '@reduxjs/toolkit';
import { deleteProducts, fetchProductsStat, searchProducts, restoreProducts, trashProducts } from '../../services/apiService';

const initialState = {
	productsScreen: 'default',
	isProductsStatLoading: false,
	isProductsSearching: false,
	isTrashingInProgress: false,
	isRestoringInProgress: false,
	isDeletingInProgress: false,
	productsAll: 0,
	productsTrash: 0
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setIsTrashingInProgress: (state, action) => {
			state.isTrashingInProgress = action.payload
		},
		setIsRestoringInProgress: (state, action) => {
			state.isRestoringInProgress = action.payload
		},
		setIsDeletingInProgress: (state, action) => {
			state.isDeletingInProgress = action.payload
		}
	},
	extraReducers: (builder) => {
        builder.addCase(fetchProductsStat.pending, (state) => {
			state.isProductsStatLoading = true;
		}),
		builder.addCase(fetchProductsStat.fulfilled, (state, action) => {
            state.isProductsStatLoading = false;
			state.productsAll = action.payload.all;
			state.productsTrash = action.payload.trash;
		}),
		builder.addCase(fetchProductsStat.rejected, (state, action) => {
			state.isProductsStatLoading = false;
        }),
        builder.addCase(trashProducts.pending, (state) => {
			state.isTrashingInProgress = true;
		}),
		builder.addCase(trashProducts.fulfilled, (state, action) => {
            state.isTrashingInProgress = false;
			state.productsAll = action.payload.stat.all;
			state.productsTrash = action.payload.stat.trash;
		}),
		builder.addCase(trashProducts.rejected, (state, action) => {
			state.isTrashingInProgress = false;
		}),
        builder.addCase(restoreProducts.pending, (state) => {
			state.isRestoringInProgress = true;
		}),
		builder.addCase(restoreProducts.fulfilled, (state, action) => {
            state.isRestoringInProgress = false;
			state.productsAll = action.payload.stat.all;
			state.productsTrash = action.payload.stat.trash;
		}),
		builder.addCase(restoreProducts.rejected, (state, action) => {
			state.isRestoringInProgress = false;
		}),
        builder.addCase(deleteProducts.pending, (state) => {
			state.isDeletingInProgress = true;
		}),
		builder.addCase(deleteProducts.fulfilled, (state, action) => {
            state.isDeletingInProgress = false;
			state.productsAll = action.payload.stat.all;
			state.productsTrash = action.payload.stat.trash;
		}),
		builder.addCase(deleteProducts.rejected, (state, action) => {
			state.isDeletingInProgress = false;
		}),
		builder.addCase(searchProducts.pending, (state) => {
			state.isProductsSearching = true;
		}),
		builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.isProductsSearching = false;
		}),
		builder.addCase(searchProducts.rejected, (state, action) => {
			state.isProductsSearching = false;
        })
	}
})

export const { setIsTrashingInProgress } = productsSlice.actions
export default productsSlice.reducer;