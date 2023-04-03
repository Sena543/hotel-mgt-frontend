import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, QuerySnapshot, DocumentData } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";

const initialState = {
	status: "idle", // 'idle' | 'loading' | 'success'| 'failed
	roomListData: [],
	errorMessage: "",
};

const getRawData = (returnedDBData: QuerySnapshot<DocumentData>) => {
	const rawData: any = [];
	returnedDBData.docs.map((doc: any) => {
		rawData.push({
			...doc.data(),
		});
	});
	return rawData;
};
export const fetchAllRooms = createAsyncThunk("fetch/rooms", async () => {
	try {
		const returnedRoomsData = await getDocs(collection(firestoredb, "rooms"));
		const returnedGuestsData = await getDocs(collection(firestoredb, "guests"));
		let roomsData: any = getRawData(returnedRoomsData);
		let guestsData: any = getRawData(returnedGuestsData);

		return { roomsData, guestsData };
	} catch (error: any) {
		console.log(error.message);

		return error.message;
	}
});
export const roomSlice = createSlice({
	name: "rooms",
	initialState,
	// initialState: [],
	reducers: {
		getRooms: (state, action) => {},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllRooms.pending, (state) => {
			state = { ...state, status: "loading" };
			return state;
		});
		builder.addCase(fetchAllRooms.fulfilled, (state, action: PayloadAction<any>) => {
			const { roomsData, guestsData } = action.payload;
			roomsData.forEach((room: any) => {
				guestsData.forEach((guest: any) => {
					if (room.roomName === guest.roomAssigned) {
						room["status"] = "Booked";
					} else {
						room["status"] = "Available";
					}
				});
			});
			state = { ...state, roomListData: roomsData, status: "success" };
			return state;
		});
		builder.addCase(fetchAllRooms.rejected, (state, action) => {
			state = { ...state, status: "failed" };
			return state;
		});
	},
});
export default roomSlice.reducer;
