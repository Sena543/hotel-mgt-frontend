import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, QuerySnapshot, DocumentData } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { getRawData } from "../../utils/util-functions";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { toast } from "react-toastify";
import { GuestsType } from "../../constants/genericTypes";
import { RoomType } from "../../components/Room/RoomList";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type RoomStateType = {
    status: "idle" | "loading" | "success" | "failed";
    roomList: RoomType[];
    errorMessage: string;
};

const initialState: RoomStateType = {
    status: "idle", // 'idle' | 'loading' | 'success'| 'failed
    roomList: [],
    errorMessage: "",
};

export const fetchAllRooms = createAsyncThunk("fetch/rooms", async (_, thunkAPI) => {
    try {
        const returnedRoomsData = await getDocs(collection(firestoredb, "rooms"));
        const returnedGuestsData = await getDocs(collection(firestoredb, "guests"));
        let roomsData = getRawData<RoomType>(returnedRoomsData);
        let guestsData = getRawData<GuestsType>(returnedGuestsData);

        return { roomsData, guestsData };
    } catch (error: any) {
        console.log(await error);

        return thunkAPI.rejectWithValue(error.message);
    }
});

export const roomSlice = createSlice({
    name: "rooms",
    initialState,
    // initialState: [],
    reducers: {
        resetRoomStatus: (state) => {
            state = { ...state, status: "idle" };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllRooms.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
            const { roomsData, guestsData } = action.payload;
            let availableRooms = roomsData.map((room) => room.roomName);

            // Iterate over all the guests and remove any rooms from
            // the availableRooms array that are occupied
            guestsData.forEach((guest) => {
                if (
                    availableRooms.includes(guest.roomAssigned) &&
                    dayjs().isBefore(dayjs(guest.checkOut))
                ) {
                    // Remove the occupied room from the available list
                    availableRooms = availableRooms.filter((room) => room !== guest.roomAssigned);
                }
            });

            // Update the status of each room based on those that are available
            // and those that are not.
            roomsData.forEach((room) => {
                if (availableRooms.includes(room.roomName)) {
                    room["status"] = "Available";
                } else {
                    room["status"] = "Booked";
                }
            });
            state = { ...state, roomList: roomsData, status: "success" };
            return state;
        });

        builder.addCase(fetchAllRooms.rejected, (state, action: PayloadAction<any>) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            toast.warn(`Fetch Room Error: ${state.errorMessage}`);
            return state;
        });
    },
});

export const { resetRoomStatus: resetStatus } = roomSlice.actions;
export default roomSlice.reducer;
