import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore/lite";
import firestoredb from "../../../firebase-config";
import { getRawData } from "../../utils/util-functions";
import { MenuItemType, TaxInformation } from "../../constants/genericTypes";
import { toast } from "react-toastify";

type TaxType = {
    status: "idle" | "loading" | "success" | "failed";
    taxes: TaxInformation[];
    errorMessage: string;
};

const initialState: TaxType = {
    status: "idle", // 'idle' | 'loading' | 'success'| 'failed
    taxes: [],
    errorMessage: "",
};

export const fetchTaxeData = createAsyncThunk(
    "fetch/taxData",
    async function fetchAllTaxData(_, thunkAPI) {
        try {
            const returnedMenuData = await getDocs(collection(firestoredb, "taxInformation"));
            const taxData = getRawData<TaxInformation>(returnedMenuData);
            return taxData;
        } catch (error: any) {
            console.log(error.message);

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const createTaxData = createAsyncThunk(
    "create/add-tax-data",
    async function createNewTaxData(taxData: TaxInformation, thunkAPI) {
        try {
            const newData = await addDoc(collection(firestoredb, "taxInformation"), taxData);
            taxData.rawDocID = newData.id;
            return taxData;
        } catch (error: any) {
            console.log(error);

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteTaxData = createAsyncThunk(
    "delete/tax-data",
    async function deleteTaxData(rawDocID: string, thunkAPI) {
        try {
            await deleteDoc(doc(firestoredb, "taxInformation", rawDocID));
            return rawDocID;
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const taxSlice = createSlice({
    name: "tax-information",
    initialState,
    reducers: {
        resetTaxStatus: (state) => {
            state = { ...state, status: "idle" };
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchTaxeData.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(fetchTaxeData.fulfilled, (state, action) => {
            state = { ...state, status: "success", taxes: action.payload };
            return state;
        });

        builder.addCase(fetchTaxeData.rejected, (state, action: PayloadAction<any>) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            toast.warn(`Error ${state.errorMessage}`);
            return state;
        });
        builder.addCase(createTaxData.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(createTaxData.fulfilled, (state, action: PayloadAction<TaxInformation>) => {
            state = {
                ...state,
                taxes: [...state.taxes, action.payload],
                status: "success",
            };
            toast.success("Success: Tax data created");
            return state;
        });
        builder.addCase(createTaxData.rejected, (state, action: any) => {
            state = { ...state, status: "failed", errorMessage: action.payload };

            toast.warn(`Error ${state.errorMessage}`);
            // state = { ...state, status: action.payload };
            return state;
        });

        builder.addCase(deleteTaxData.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(deleteTaxData.fulfilled, (state: any, action: PayloadAction<string>) => {
            let taxes = state.taxes;

            taxes = taxes.filter(
                ({ rawDocID }: { rawDocID: string }) => rawDocID !== action.payload
            );

            state = {
                ...state,
                taxes: taxes,
                status: "success",
            };
            toast.success("Success: Menu item deleted");
            return state;
        });
        builder.addCase(deleteTaxData.rejected, (state, action: any) => {
            state = { ...state, status: "failed", errorMessage: action.payload };
            toast.warn(`Error ${state.errorMessage}`);
            // state = { ...state, status: action.payload };
            return state;
        });
    },
});

export const { resetTaxStatus } = taxSlice.actions;
export default taxSlice.reducer;
