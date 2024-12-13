import { createSlice } from '@reduxjs/toolkit';
import { fetchSettings, saveSettings } from '../../services/apiService';
import { __ } from '@wordpress/i18n';

const initialState = {
	deleteProductImages: false,
	isSettingsLoading: false,
	isSettingsSaving: false,

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
		setDeleteProductImages: (state, action) => {
			state.deleteProductImages = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSettings.pending, (state) => {
			state.isSettingsLoading = true;
		}),
		builder.addCase(fetchSettings.fulfilled, (state, action) => {
			state.isSettingsLoading = false;
			state.deleteProductImages = action.payload.delete_product_images === 'yes' ? true: false;
			state.error = null;
		}),
		builder.addCase(fetchSettings.rejected, (state, action) => {
			state.isSettingsLoading = false;
			state.error = (action.error?.message) ? action.error.message : null;
		}),
		builder.addCase(saveSettings.pending, (state) => {
			state.isSettingsSaving = true;
		}),
		builder.addCase(saveSettings.fulfilled, (state, action) => {
			state.isSettingsSaving = false;
			state.error = null;
			state.settingsToastMessage = __('Settings have been saved successfully', 'delete-all-products');
		}),
		builder.addCase(saveSettings.rejected, (state, action) => {
			state.isSettingsSaving = false;
			state.error = (action.error?.message) ? action.error.message : null;
		})
	}
})

export const { setSettingsToastMessage, setDeleteProductImages } = settingsSlice.actions
export default settingsSlice.reducer;
