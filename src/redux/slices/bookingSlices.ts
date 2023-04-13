import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc, getDoc, where, query } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { getRawData } from "../../utils/util-functions";
import { BookingHistoryType } from "../../constants/genericTypes";

const initialState = {
	status: "idle", // 'idle' | 'loading' | 'success'| 'failed
	bookingHistory: [],
	errorMessage: "",
};

export const fetchGuestBookingHistory = createAsyncThunk(
	"fetch/booking-history",
	// async function fetchGuestBookingHistory(guestID, thunkAPI) {
	async (guestID, thunkAPI) => {
		try {
			const historyQuery = query(collection(firestoredb, "booking"), where("guestID", "==", guestID));
			const returnedGuestsData = await getDocs(historyQuery);
			const bookingHistoryData: any = getRawData(returnedGuestsData);

			return bookingHistoryData;
		} catch (error: any) {
			console.log(error.message);

			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const createNewBookingHistory = createAsyncThunk(
	"create/booking-history",
	async function createBookingHistory(newBookingHistoryData: BookingHistoryType, thunkAPI) {
		try {
			await addDoc(collection(firestoredb, "booking"), newBookingHistoryData);
			return newBookingHistoryData;
		} catch (error: any) {
			console.log(error);

			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const bookingSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {
		resetStatus: (state) => {
			state = { ...state, status: "idle" };
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchGuestBookingHistory.pending, (state) => {
			state = { ...state, status: "loading" };
			return state;
		});
		builder.addCase(fetchGuestBookingHistory.fulfilled, (state, action: PayloadAction<any>) => {
			state = { ...state, status: "sucess", bookingHistory: action.payload };

			return state;
		});

		builder.addCase(fetchGuestBookingHistory.rejected, (state, action: PayloadAction<any>) => {
			state = { ...state, status: "failed", errorMessage: action.payload };
			return state;
		});
		builder.addCase(createNewBookingHistory.pending, (state) => {
			state = { ...state, status: "loading" };
			return state;
		});
		builder.addCase(createNewBookingHistory.fulfilled, (state: any, action: PayloadAction<BookingHistoryType>) => {
			state = { ...state, staffData: [...state.staffData, action.payload], status: "success" };
			return state;
		});
		builder.addCase(createNewBookingHistory.rejected, (state, action: any) => {
			state = { ...state, status: "failed", errorMessage: action.payload };
			// state = { ...state, status: action.payload };
			return state;
		});
	},
});

export const { resetStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
