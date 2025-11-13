import { createSlice } from '@reduxjs/toolkit';
import { deleteProducts, fetchProductsStat, restoreProducts, trashProducts } from '../../services/apiService';

const initialState = {
	productsScreen: 'default',
	isProductsStatLoading: false,
	isProductsSearching: false,
	isTrashingInProgress: false,
	isRestoringInProgress: false,
	isDeletingInProgress: false,
	productsAllCount: 0,
	productsTrashCount: 0
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
		},
		setProductsAllCount: (state, action) => {
			state.productsAllCount = action.payload;
		},
		addProductsAllCount: (state, action) => {
			state.productsAllCount += action.payload;
		},
		subProductsAllCount: (state, action) => {
			state.productsAllCount -= action.payload;
		},
		setProductsTrashCount: (state, action) => {
			stateproductsTrashCount = action.payload;
		},
		addProductsTrashCount: (state, action) => {
			stateproductsTrashCount += action.payload;
		},
		subProductsTrashCount: (state, action) => {
			stateproductsTrashCount -= action.payload;
		}
	},
	extraReducers: (builder) => {
        builder.addCase(fetchProductsStat.pending, (state) => {
			state.isProductsStatLoading = true;
		}),
		builder.addCase(fetchProductsStat.fulfilled, (state, action) => {
            state.isProductsStatLoading = false;
			state.productsAllCount = action.payload.all;
			stateproductsTrashCount = action.payload.trash;
		}),
		builder.addCase(fetchProductsStat.rejected, (state, action) => {
			state.isProductsStatLoading = false;
        }),
        builder.addCase(trashProducts.pending, (state) => {
			state.isTrashingInProgress = true;
		}),
		builder.addCase(trashProducts.fulfilled, (state, action) => {
            state.isTrashingInProgress = false;
			state.productsAllCount = action.payload.stat.all;
			stateproductsTrashCount = action.payload.stat.trash;
		}),
		builder.addCase(trashProducts.rejected, (state, action) => {
			state.isTrashingInProgress = false;
		}),
        builder.addCase(restoreProducts.pending, (state) => {
			state.isRestoringInProgress = true;
		}),
		builder.addCase(restoreProducts.fulfilled, (state, action) => {
            state.isRestoringInProgress = false;
			state.productsAllCount = action.payload.stat.all;
			stateproductsTrashCount = action.payload.stat.trash;
		}),
		builder.addCase(restoreProducts.rejected, (state, action) => {
			state.isRestoringInProgress = false;
		}),
        builder.addCase(deleteProducts.pending, (state) => {
			state.isDeletingInProgress = true;
		}),
		builder.addCase(deleteProducts.fulfilled, (state, action) => {
            state.isDeletingInProgress = false;
			state.productsAllCount = action.payload.stat.all;
			stateproductsTrashCount = action.payload.stat.trash;
		}),
		builder.addCase(deleteProducts.rejected, (state, action) => {
			state.isDeletingInProgress = false;
		})
	}
})

export const { setIsTrashingInProgress, setProductsAllCount, addProductsAllCount, subProductsAllCount, setProductsTrashCount, addProductsTrashCount, subProductsTrashCount } = productsSlice.actions
export default productsSlice.reducer;