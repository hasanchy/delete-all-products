import { createSlice } from '@reduxjs/toolkit';
import { __ } from '@wordpress/i18n';

const initialState = {
	deleteAllProductsType: 'all',
	deleteProductImages: false,

	error: null,
	message: '',
	settingsToastMessage: ''
}

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSettingsToastMessage: (state, action) => {
			state.settingsToastMessage = action.payload;
		},
		setDeleteAllProductsType: (state, action) => {
			state.deleteAllProductsType = action.payload;
		},
		setDeleteProductImages: (state, action) => {
			state.deleteProductImages = action.payload;
		},
		setDeleteProductImages: (state, action) => {
			state.deleteProductImages = action.payload;
		},
	},
	extraReducers: (builder) => {}
})

export const { setSettingsToastMessage, setDeleteProductImages, setDeleteAllProductsType } = settingsSlice.actions
export default settingsSlice.reducer;
