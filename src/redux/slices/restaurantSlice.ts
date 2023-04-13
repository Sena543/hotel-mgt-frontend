import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { getRawData } from "../../utils/util-functions";
import { MenuItemType } from "../../constants/genericTypes";

const initialState = {
	status: "idle", // 'idle' | 'loading' | 'success'| 'failed
	restaurantMealsList: [],
	errorMessage: "",
};

export const fetchRestaurantMenu = createAsyncThunk(
	"fetch/restaurant-meals",
	async function fetchAllRestaurantMenu(_, thunkAPI) {
		try {
			const returnedMenuData = await getDocs(collection(firestoredb, "restaurant"));
			const menuData: any = getRawData(returnedMenuData);

			return menuData;
		} catch (error: any) {
			console.log(error.message);

			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const createNewMenuItem = createAsyncThunk(
	"create/new-menu-item",
	async function createNewMenuItem(newMenuItemData: MenuItemType, thunkAPI) {
		try {
			const newData = await addDoc(collection(firestoredb, "restaurant"), newMenuItemData);
			newMenuItemData.rawDocID = newData.id;
			return newMenuItemData;
		} catch (error: any) {
			console.log(error);

			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const deleteMenuItem = createAsyncThunk(
	"delete/new-menu-item",
	async function deleteMenuItem(dishId: string, thunkAPI) {
		try {
			await deleteDoc(doc(firestoredb, "restaurant", dishId));
			return dishId;
		} catch (error: any) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
export const restaurantSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {
		resetStatus: (state) => {
			state = { ...state, status: "idle" };
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchRestaurantMenu.pending, (state) => {
			state = { ...state, status: "loading" };
			return state;
		});
		builder.addCase(fetchRestaurantMenu.fulfilled, (state, action: PayloadAction<any>) => {
			state = { ...state, status: "sucess", restaurantMealsList: action.payload };

			return state;
		});

		builder.addCase(fetchRestaurantMenu.rejected, (state, action: PayloadAction<any>) => {
			state = { ...state, status: "failed", errorMessage: action.payload };
			return state;
		});
		builder.addCase(createNewMenuItem.pending, (state) => {
			state = { ...state, status: "loading" };
			return state;
		});
		builder.addCase(createNewMenuItem.fulfilled, (state: any, action: PayloadAction<MenuItemType>) => {
			state = {
				...state,
				restaurantMealsList: [...state.restaurantMealsList, action.payload],
				status: "success",
			};
			return state;
		});
		builder.addCase(createNewMenuItem.rejected, (state, action: any) => {
			state = { ...state, status: "failed", errorMessage: action.payload };
			// state = { ...state, status: action.payload };
			return state;
		});

		builder.addCase(deleteMenuItem.pending, (state) => {
			state = { ...state, status: "loading" };
			return state;
		});
		builder.addCase(deleteMenuItem.fulfilled, (state: any, action: PayloadAction<any>) => {
			let restaurantMenu = state.restaurantMealsList;
			restaurantMenu = restaurantMenu.filter(({ rawDocID }: { rawDocID: string }) => rawDocID !== action.payload);

			state = {
				...state,
				restaurantMealsList: restaurantMenu,
				status: "success",
			};
			return state;
		});
		builder.addCase(deleteMenuItem.rejected, (state, action: any) => {
			state = { ...state, status: "failed", errorMessage: action.payload };
			// state = { ...state, status: action.payload };
			return state;
		});
	},
});

export const { resetStatus } = restaurantSlice.actions;
export default restaurantSlice.reducer;
