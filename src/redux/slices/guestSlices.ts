import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuestsType } from "../../constants/genericTypes";
import { guests } from "../../services/guests";
import { collection, getDocs } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";

type StateType = {
	status: string;
	guestData: GuestsType[];
	errorMessage: string;
};
const initialState = {
	status: "idle", // 'idle' | 'loading' | 'success'| 'failed
	guestsData: [],
	errorMessage: "",
};
export const fetchGuests = createAsyncThunk("fetch/guests", async () => {
	try {
		const returnedData = await getDocs(collection(firestoredb, "guests"));
		let data: any = [];
		returnedData.docs.map((doc: any) => {
			data.push({
				...doc.data(),
			});
		});
		return data;
	} catch (error: any) {
		console.log(error);

		return error.message;
	}
});

export const addNewGuest = createAsyncThunk("post/new-guests", async () => {
	try {
		const returnedData = await getDocs(collection(firestoredb, "guests"));
		let data: any = [];
		returnedData.docs.map((doc: any) => {
			data.push({
				...doc.data(),
			});
		});
		return data;
	} catch (error: any) {
		console.log(error);

		return error.message;
	}
});

export const guestSlice = createSlice({
	name: "Guests",
	initialState,
	// initialState: [],
	reducers: {
		// fetchAllGuests: (state: any, action) => {
		// 	state = action.payload;
		// },
		createNewGuest: (state: any, action: PayloadAction<GuestsType>) => {
			// createNewGuest: (state: WritableDraft<StateType>, action: PayloadAction<GuestsType>) => {
			const guestDetails = {
				lastName: action.payload.lastName,
				firstName: action.payload.firstName,
				email: action.payload.email,
				contact: action.payload.contact,
				checkIn: action.payload.checkIn,
				checkOut: action.payload.checkOut,
				roomAssigned: action.payload.roomAssigned,
			};
			const newGuest = [...state.guestData, guestDetails];
			state = { ...state, guestsData: newGuest };
			return state;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchGuests.pending, (state) => {
			state = { ...state, status: "loading" };
			return state;
		});
		builder.addCase(fetchGuests.fulfilled, (state, action) => {
			state = { ...state, guestsData: action.payload };
			return state;
		});
		builder.addCase(fetchGuests.rejected, (state, action) => {
			state = { ...state, status: "failed" };
			// state = { ...state, status: action.payload };
			return state;
		});
	},
});

export const { createNewGuest } = guestSlice.actions;
export default guestSlice.reducer;
