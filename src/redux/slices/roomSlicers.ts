import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, QuerySnapshot, DocumentData } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { getRawData } from "../../utils/util-functions";

const initialState = {
    status: "idle", // 'idle' | 'loading' | 'success'| 'failed
    roomList: [],
    errorMessage: "",
};

export const fetchAllRooms = createAsyncThunk("fetch/rooms", async (_, thunkAPI) => {
    try {
        const returnedRoomsData = await getDocs(collection(firestoredb, "rooms"));
        const returnedGuestsData = await getDocs(collection(firestoredb, "guests"));
        let roomsData: any = getRawData(returnedRoomsData);
        let guestsData: any = getRawData(returnedGuestsData);

        return { roomsData, guestsData };
    } catch (error: any) {
        console.log(error.message);

        return thunkAPI.rejectWithValue(error.message);
    }
});
export const roomSlice = createSlice({
    name: "rooms",
    initialState,
    // initialState: [],
    reducers: {
        resetStatus: (state) => {
            state = { ...state, status: "idle" };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllRooms.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(fetchAllRooms.fulfilled, (state, action: PayloadAction<any>) => {
            const { roomsData, guestsData } = action.payload;

            //assign status of room to each room by looping over guests
            //and checking if roomName == roomAssigned

            roomsData.forEach((room: any) => {
                guestsData.forEach((guest: any) => {
                    if (room.roomName === guest.roomAssigned) {
                        room["status"] = "Booked";
                    } else {
                        room["status"] = "Available";
                    }
                });
            });
            if (guestsData.length === 0) {
                roomsData.forEach((room: any) => {
                    room["status"] = "Available";
                });
            }
            state = { ...state, roomList: roomsData, status: "success" };
            return state;
        });

        builder.addCase(fetchAllRooms.rejected, (state, action: PayloadAction<any>) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            return state;
        });
    },
});

export const { resetStatus } = roomSlice.actions;
export default roomSlice.reducer;
