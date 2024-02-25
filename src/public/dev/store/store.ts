import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from "../features/tabs/tabsSlice";
import productsReducer from "../features/products/productsSlice";

const store = configureStore({
	reducer: {
		tabs: tabsReducer,
		products: productsReducer
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;