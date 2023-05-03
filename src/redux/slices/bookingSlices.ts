import { PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
    getDocs,
    collection,
    addDoc,
    getDoc,
    where,
    query,
    updateDoc,
    arrayUnion,
    doc,
} from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { getRawData } from "../../utils/util-functions";
import { BookingHistoryType } from "../../constants/genericTypes";

const initialState = {
    status: "idle", // 'idle' | 'loading' | 'success'| 'failed
    bookingHistory: [],
    errorMessage: "",
};

export const fetchAllGuestBookingHistory = createAsyncThunk(
    "fetch/all-booking-history",
    async (_, thunkAPI) => {
        try {
            const returnedGuestsData = await getDocs(collection(firestoredb, "booking"));
            const bookingHistoryData: any = getRawData(returnedGuestsData);

            return bookingHistoryData;
        } catch (error: any) {
            console.log(error.message);

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchGuestBookingHistory = createAsyncThunk(
    "fetch/booking-history",
    async (guestID: number, thunkAPI) => {
        try {
            const historyQuery = query(
                collection(firestoredb, "booking"),
                where("guestID", "==", guestID)
            );
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
    async function createBookingHistory(orderData: any, thunkAPI) {
        try {
            await addDoc(collection(firestoredb, "booking"), orderData);
            return orderData;
        } catch (error: any) {
            console.log(error);

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const createNewGuestMealOrder = createAsyncThunk(
    "create/new-guest-order",
    async function createGuestMealOrder(orderData: any, thunkAPI) {
        try {
            const { data, rawDocID } = orderData;
            await updateDoc(doc(firestoredb, "booking", rawDocID), {
                mealOrderID: arrayUnion(data),
            });
            // await addDoc(collection(firestoredb, "booking"), orderData);
            return orderData;
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
        builder.addCase(
            createNewBookingHistory.fulfilled,
            (state: any, action: PayloadAction<BookingHistoryType>) => {
                state = {
                    ...state,
                    bookingHistory: [...state.bookingHistory, action.payload],
                    status: "success",
                };
                return state;
            }
        );

        builder.addCase(createNewBookingHistory.rejected, (state, action: any) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            // state = { ...state, status: action.payload };
            return state;
        });
        builder.addCase(createNewGuestMealOrder.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(
            createNewGuestMealOrder.fulfilled,
            (state: any, action: PayloadAction<any>) => {
                const { rawDocID, data } = action.payload;

                let currentState = JSON.parse(JSON.stringify(current(state))); //makes the state mutable

                console.log(data, "data");
                console.log(Object.getOwnPropertyDescriptors(currentState));
                let findBookingOrder = currentState.bookingHistory.filter(
                    (hist: any) => hist.rawDocID === rawDocID
                )[0];
                const indexOfBooking = currentState.bookingHistory.findIndex(
                    (element: any) => element.rawDocID === rawDocID
                );

                if (findBookingOrder?.mealOrderID.length === 0) {
                    findBookingOrder.mealOrderID = [data];
                } else {
                    // findBookingOrder.mealOrderID.push(data);
                    const newDataUpdate = [...findBookingOrder.mealOrderID, data];
                    findBookingOrder.mealOrderID = newDataUpdate;
                }
                // console.log(findBookingOrder);
                console.log(currentState.bookingHistory, "bh");
                currentState.bookingHistory[indexOfBooking].mealOrderID =
                    findBookingOrder.mealOrderID;

                return currentState;
            }
        );
        builder.addCase(createNewGuestMealOrder.rejected, (state, action: any) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            // state = { ...state, status: action.payload };
            return state;
        });

        builder.addCase(
            fetchAllGuestBookingHistory.rejected,
            (state, action: PayloadAction<any>) => {
                state = { ...state, status: "failed", errorMessage: action.payload };
                return state;
            }
        );
        builder.addCase(fetchAllGuestBookingHistory.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(
            fetchAllGuestBookingHistory.fulfilled,
            (state: any, action: PayloadAction<[BookingHistoryType]>) => {
                state = {
                    ...state,
                    bookingHistory: [...action.payload],
                    // bookingHistory: [...state.bookingHistory, ...action.payload],
                    status: "success",
                };
                return state;
            }
        );
    },
});

export const { resetStatus } = bookingSlice.actions;
export default bookingSlice.reducer;