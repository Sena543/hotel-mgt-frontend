import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { getRawData } from "../../utils/util-functions";
import { StaffDetailsType } from "../../constants/genericTypes";
import { toast } from "react-toastify";

const initialState = {
    status: "idle", // 'idle' | 'loading' | 'success'| 'failed
    staffData: [],
    errorMessage: "",
};

export const fetchAllStaff = createAsyncThunk(
    "fetch/staff",
    async function fetchStaff(_, thunkAPI) {
        try {
            const returnedGuestsData = await getDocs(collection(firestoredb, "employees"));
            const staffData: any = getRawData(returnedGuestsData);

            return staffData;
        } catch (error: any) {
            console.log(error.message);

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const createNewStaff = createAsyncThunk(
    "create/employees",
    async function fetchStaff(newEmployeeData: StaffDetailsType, thunkAPI) {
        try {
            await addDoc(collection(firestoredb, "employees"), newEmployeeData);
            return newEmployeeData;
        } catch (error: any) {
            console.log(error);

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state = { ...state, status: "idle" };
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchAllStaff.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(fetchAllStaff.fulfilled, (state, action: PayloadAction<any>) => {
            state = { ...state, status: "sucess", staffData: action.payload };
            toast.success("Success");
            return state;
        });

        builder.addCase(fetchAllStaff.rejected, (state, action: PayloadAction<any>) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            toast.warn(`Error ${state.errorMessage}`);
            return state;
        });
        builder.addCase(createNewStaff.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(
            createNewStaff.fulfilled,
            (state: any, action: PayloadAction<StaffDetailsType>) => {
                state = {
                    ...state,
                    staffData: [...state.staffData, action.payload],
                    status: "success",
                };
                toast.success("Success");
                return state;
            }
        );
        builder.addCase(createNewStaff.rejected, (state, action: any) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            toast.warn(`Error ${state.errorMessage}`);
            // state = { ...state, status: action.payload };
            return state;
        });
    },
});

export const { resetStatus } = staffSlice.actions;
export default staffSlice.reducer;
