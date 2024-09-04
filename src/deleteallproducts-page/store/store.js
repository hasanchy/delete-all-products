import { configureStore } from '@reduxjs/toolkit'
import menuTabsReducer from "../components/menu-tabs/manuTabsSlice";
import productsSlice from '../features/products/productsSlice';

const store = configureStore({
	reducer: {
		menuTabs: menuTabsReducer,
		products: productsSlice,
	},
})

export default store;