import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { getRawData } from "../../utils/util-functions";
import { MenuItemType } from "../../constants/genericTypes";
import { toast } from "react-toastify";

type RestaurantType = {
    status: "idle" | "loading" | "success" | "failed";
    restaurantMealsList: MenuItemType[];
    errorMessage: string;
};

const initialState: RestaurantType = {
    status: "idle", // 'idle' | 'loading' | 'success'| 'failed
    restaurantMealsList: [],
    errorMessage: "",
};

export const fetchRestaurantMenu = createAsyncThunk(
    "fetch/restaurant-meals",
    async function fetchAllRestaurantMenu(_, thunkAPI) {
        try {
            const returnedMenuData = await getDocs(collection(firestoredb, "restaurant"));
            const menuData = getRawData<MenuItemType>(returnedMenuData);

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
        builder.addCase(fetchRestaurantMenu.fulfilled, (state, action) => {
            state = { ...state, status: "success", restaurantMealsList: action.payload };
            return state;
        });

        builder.addCase(fetchRestaurantMenu.rejected, (state, action: PayloadAction<any>) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            toast.warn(`Error ${state.errorMessage}`);
            return state;
        });
        builder.addCase(createNewMenuItem.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(
            createNewMenuItem.fulfilled,
            (state, action: PayloadAction<MenuItemType>) => {
                state = {
                    ...state,
                    restaurantMealsList: [...state.restaurantMealsList, action.payload],
                    status: "success",
                };
                toast.success("Success: Menu item created");
                return state;
            }
        );
        builder.addCase(createNewMenuItem.rejected, (state, action: any) => {
            state = { ...state, status: "failed", errorMessage: action.payload };

            toast.warn(`Error ${state.errorMessage}`);
            // state = { ...state, status: action.payload };
            return state;
        });

        builder.addCase(deleteMenuItem.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(deleteMenuItem.fulfilled, (state: any, action: PayloadAction<string>) => {
            let restaurantMenu = state.restaurantMealsList;
            
            restaurantMenu = restaurantMenu.filter(
                ({ rawDocID }: { rawDocID: string }) => rawDocID !== action.payload
            );

            state = {
                ...state,
                restaurantMealsList: restaurantMenu,
                status: "success",
            };
            toast.success("Success: Menu item deleted");
            return state;
        });
        builder.addCase(deleteMenuItem.rejected, (state, action: any) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            toast.warn(`Error ${state.errorMessage}`);
            // state = { ...state, status: action.payload };
            return state;
        });
    },
});

export const { resetStatus } = restaurantSlice.actions;
export default restaurantSlice.reducer;
