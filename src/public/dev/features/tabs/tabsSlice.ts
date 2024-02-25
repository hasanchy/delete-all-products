import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'


// Define a type for the slice state
interface TabsState {
	activeTab: string
}

// Define the initial state using that type
const initialState: TabsState = {
	activeTab: 'all',
}

export const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		setActiveTab: (state, action: PayloadAction<string>) => {
			state.activeTab = action.payload;
		}
	},
})

// Action creators are generated for each case reducer function
export const { setActiveTab } = tabsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActiveTab = (state: RootState) => state.tabs.activeTab

export default tabsSlice.reducer