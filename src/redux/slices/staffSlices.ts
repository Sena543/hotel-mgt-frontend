import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { getRawData } from "../../utils/util-functions";
import { StaffDetailsType } from "../../constants/genericTypes";
import { toast } from "react-toastify";

export type UserType = {
    name: string;
    email: string;
    role: string;
};
type StaffState = {
    status: "idle" | "loading" | "success" | "failed";
    staffData: StaffDetailsType[];
    users: UserType[];
    errorMessage: string;
};
const initialState: StaffState = {
    status: "idle", // 'idle' | 'loading' | 'success'| 'failed
    staffData: [],
    users: [],
    errorMessage: "",
};

export const fetchAllStaff = createAsyncThunk(
    "fetch/staff",
    async function fetchStaff(_, thunkAPI) {
        try {
            const returnedGuestsData = await getDocs(collection(firestoredb, "employees"));
            const staffData = getRawData<StaffDetailsType>(returnedGuestsData);

            return staffData;
        } catch (error: any) {
            console.log(error.message);

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchAllUsers = createAsyncThunk(
    "fetch/users",
    async function fetchUsers(_, thunkAPI) {
        try {
            const returnedGuestsData = await getDocs(collection(firestoredb, "users"));
            const userData = getRawData<UserType>(returnedGuestsData);

            return userData;
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
            state = { ...state, status: "success", staffData: action.payload };
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
            (state: StaffState, action: PayloadAction<StaffDetailsType>) => {
                state = {
                    ...state,
                    staffData: [...state.staffData, action.payload],
                    status: "success",
                };
                toast.success("Success: New Staff Member Data saved");

                return state;
            }
        );
        builder.addCase(createNewStaff.rejected, (state, action: any) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            toast.warn(`Error ${state.errorMessage}`);
            // state = { ...state, status: action.payload };
            return state;
        });
        builder.addCase(fetchAllUsers.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(
            fetchAllUsers.fulfilled,
            (state: StaffState, action: PayloadAction<UserType[]>) => {
                state = {
                    ...state,
                    // users: [...state.users, ...action.payload],
                    users: [...action.payload],
                    status: "success",
                };

                return state;
            }
        );
        builder.addCase(fetchAllUsers.rejected, (state: StaffState, action: any) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            toast.warn(`Error ${state.errorMessage}`);
            // state = { ...state, status: action.payload };
            return state;
        });
    },
});

export const { resetStatus } = staffSlice.actions;
export default staffSlice.reducer;
