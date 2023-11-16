import { PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
    arrayUnion,
    doc,
    updateDoc,
    getDocs,
    collection,
    QuerySnapshot,
    DocumentData,
} from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { createUploadRef, formattedDate, getRawData } from "../../utils/util-functions";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { toast } from "react-toastify";
import { GuestsType } from "../../constants/genericTypes";
import { RoomType } from "../../components/Room/RoomList";
import { getDownloadURL, uploadBytes } from "firebase/storage";
// import { arrayUnion, doc, updateDoc } from "firebase/firestore";
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

export const addRoomImage = createAsyncThunk(
    "post/roomImage",
    async (uploadDetailds: { file: File; roomDetails: RoomType }, thunkAPI) => {
        try {
            const { file, roomDetails } = uploadDetailds;
            console.log(roomDetails);
            const imageRef = createUploadRef("/images", file.name);
            // const returnedRoomsData = await getDocs(collection(firestoredb, "rooms"));
            const returnedValue = await uploadBytes(imageRef, file);
            const imgUrl = await getDownloadURL(returnedValue.ref);
            const { rawDocID } = roomDetails;
            console.log(rawDocID, "mmm");
            const docRef = doc(firestoredb, "rooms", rawDocID);
            await updateDoc(docRef, {
                imageUrls: arrayUnion(imgUrl),
            });
            return { imgUrl, roomDetails };
        } catch (error: any) {
            console.log(await error);
            console.error(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

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
            const reservedGuests = guestsData.filter((guest) =>
                dayjs().isBefore(formattedDate(guest.checkIn))
            );

            //gets room names
            let availableRooms = roomsData.map((room) => room.roomName);

            // Iterate over all the guests and remove any rooms from
            // the availableRooms array that are occupied
            guestsData.forEach((guest) => {
                if (
                    //if current day is before checkout then removed that room cos
                    //room is still occupied.
                    availableRooms.includes(guest.roomAssigned) &&
                    dayjs().isBefore(dayjs(formattedDate(guest.checkOut))) &&
                    dayjs().isBefore(formattedDate(guest.checkIn))
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
                    // room["status"] = "Booked";
                    reservedGuests.forEach((guest) => {
                        if (
                            guest.roomAssigned === room.roomName &&
                            dayjs().isBefore(formattedDate(guest.checkIn))
                        ) {
                            room["status"] = "Reserved";
                        } else {
                            room["status"] = "Booked";
                        }
                    });
                }

                // reservedGuests.forEach((guest) => {
                //     if (
                //         guest.roomAssigned === room.roomName &&
                //         dayjs().isBefore(
                //             // new Date(Date.parse(guest.checkIn.split("-").reverse().join("-")))
                //             formattedDate(guest.checkIn)
                //         )
                //     ) {
                //         room["status"] = "Reserved";
                //     }
                // });
            });
            console.log(roomsData);
            state = { ...state, roomList: roomsData, status: "success" };
            return state;
        });

        builder.addCase(fetchAllRooms.rejected, (state, action: PayloadAction<any>) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            toast.warn(`Fetch Room Error: ${state.errorMessage}`);
            return state;
        });
        builder.addCase(addRoomImage.pending, (state, action: PayloadAction<any>) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(addRoomImage.fulfilled, (state, action: PayloadAction<any>) => {
            const { imgUrl, roomDetails } = action.payload;
            // console.log(roomDetails);
            let currentState = JSON.parse(JSON.stringify(current(state))); //makes the state mutable
            const findRoom = currentState.roomList.filter((room: RoomType) => {
                return room.rawDocID === roomDetails.rawDocID;
            })[0];
            let roomList = currentState.roomList.filter((room: RoomType) => {
                return room.rawDocID != roomDetails.rawDocID;
            });
            findRoom.imageUrls.push(imgUrl);
            roomList = [...roomList, findRoom];
            currentState.roomList = roomList;
            // state = { ...state, roomList: roomList, status: "success" };
            toast.success(`Image Upload success`);
            // return state;
            return currentState;
        });
        builder.addCase(addRoomImage.rejected, (state, action: PayloadAction<any>) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            toast.warn(`Fetch Room Error: ${state.errorMessage}`);
            return state;
        });
    },
});

export const { resetRoomStatus: resetStatus } = roomSlice.actions;
export default roomSlice.reducer;
