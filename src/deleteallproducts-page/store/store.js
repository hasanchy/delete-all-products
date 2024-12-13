import { configureStore } from '@reduxjs/toolkit'
import menuTabsReducer from "../components/menu-tabs/manuTabsSlice";
import productsSlice from '../features/products/productsSlice';
import settingsSlice from '../features/settings/settingsSlice';

const store = configureStore({
	reducer: {
		menuTabs: menuTabsReducer,
		products: productsSlice,
        settings: settingsSlice
	},
})

export default store;