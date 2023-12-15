import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { GuestsType } from "../../constants/genericTypes";
import { guests } from "../../services/guests";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { toast } from "react-toastify";
import { getRawData } from "../../utils/util-functions";

export type GuestStateType = {
    status: string;
    guestsData: [] | Array<Omit<GuestsType, "rawDocID">>;
    // guestsData: [] | GuestsType[];
    errorMessage: string;
};

const initialState: GuestStateType = {
    status: "idle", // 'idle' | 'loading' | 'success'| 'failed
    guestsData: [],
    errorMessage: "",
};
export const fetchGuests = createAsyncThunk("fetch/guests", async (_, thunkAPI) => {
    try {
        const returnedData = await getDocs(collection(firestoredb, "guests"));
        const data = getRawData<GuestsType>(returnedData);

        return data;
    } catch (error: any) {
        console.log(error.message);

        return thunkAPI.rejectWithValue(error.message);
    }
});

export const addNewGuest = createAsyncThunk(
    "post/new-guests",
    async (newGuestData: Omit<GuestsType, "rawDocID">, thunkAPI) => {
        try {
            await addDoc(collection(firestoredb, "guests"), newGuestData);
            return newGuestData;
        } catch (error: any) {
            console.log(error);

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const saveGuestPaymentReference = createAsyncThunk(
    "post/saveGuestPaymentReference",
    async (updateData: { reference: string; rawDocID: string }, thunkAPI) => {
        const { reference, rawDocID } = updateData;
        try {
            await updateDoc(doc(firestoredb, "guests", rawDocID), {
                reference,
            });
            return updateData;
        } catch (error: any) {
            console.log(error);

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const guestSlice = createSlice({
    name: "Guests",
    initialState,
    // initialState: [],
    reducers: {
        createNewGuest: (state: GuestStateType, action: PayloadAction<GuestsType>) => {
            // createNewGuest: (state: WritableDraft<StateType>, action: PayloadAction<GuestsType>) => {
            const guestDetails = {
                lastName: action.payload.lastName,
                firstName: action.payload.firstName,
                email: action.payload.email,
                contact: action.payload.contact,
                checkIn: action.payload.checkIn,
                checkOut: action.payload.checkOut,
                roomAssigned: action.payload.roomAssigned,
                title: action.payload.title,
                guestID: action.payload.guestID,
                reference: action.payload.reference,
            };
            const newGuest = [...state.guestsData, guestDetails];
            state = { ...state, guestsData: newGuest };
            return state;
        },
        resetGuestStatus: (state) => {
            state = { ...state, status: "idle" };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGuests.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(fetchGuests.fulfilled, (state, action) => {
            state = { ...state, guestsData: action.payload, status: "success" };
            return state;
        });
        builder.addCase(fetchGuests.rejected, (state, action) => {
            state = { ...state, status: "failed" };
            toast.warn(`Error ${state.errorMessage}`);
            // state = { ...state, status: action.payload };
            return state;
        });
        builder.addCase(addNewGuest.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(
            addNewGuest.fulfilled,
            (state, action: PayloadAction<Omit<GuestsType, "rawDocID">>) => {
                // (state, action: PayloadAction<GuestsType>) => {
                state = {
                    ...state,
                    guestsData: [...state.guestsData, action.payload],
                    status: "success",
                };
                // state = { ...state, guestsData: action.payload, status: "success" };
                toast.success("Success: Guest created");
                return state;
            }
        );
        builder.addCase(addNewGuest.rejected, (state, action: any) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            // state = { ...state, status: action.payload };
            return state;
        });
        builder.addCase(saveGuestPaymentReference.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(
            saveGuestPaymentReference.fulfilled,
            (state, action: PayloadAction<{ reference: string; rawDocID: string }>) => {
                const { rawDocID, reference } = action.payload;

                console.log("ran save guest reference");
                let currentState = JSON.parse(JSON.stringify(current(state))); //makes the state mutable
                const filterOutFoundGuest = currentState.guestsData.filter(
                    (s: GuestsType) => s.rawDocID != rawDocID
                );
                const findGuest = currentState.guestsData.filter(
                    (s: GuestsType) => s.rawDocID === rawDocID
                )[0];

                findGuest["reference"] = reference;
                state = {
                    ...state,
                    status: "success",
                    guestsData: [...filterOutFoundGuest, findGuest],
                };

                toast.success("Transaction completed");
                return state;
            }
        );
        builder.addCase(saveGuestPaymentReference.rejected, (state, action: any) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            // state = { ...state, status: action.payload };
            return state;
        });
    },
});

export const { createNewGuest, resetGuestStatus } = guestSlice.actions;
export default guestSlice.reducer;
