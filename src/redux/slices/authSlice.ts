import { PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
    getDocs,
    collection,
    addDoc,
    where,
    query,
    updateDoc,
    arrayUnion,
    doc,
} from "firebase/firestore/lite";
import firestoredb, { auth } from "../../../firebase-config";
import { getRawData } from "../../utils/util-functions";
import { BookingHistoryType } from "../../constants/genericTypes";
import { toast } from "react-toastify";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { Password } from "@mui/icons-material";

interface AuthState {
    status: "idle" | "loading" | "success" | "failed";
    authData: BookingHistoryType[];
    errorMessage: string;
}
const initialState = {
    // const initialState: AuthState = {
    status: "idle", // 'idle' | 'loading' | 'success'| 'failed
    authData: {
        email: "",
        role: "",
    },
    errorMessage: "",
};

export const loginWithEmailAndPassword = createAsyncThunk(
    "loginWithEmailAndPassword",
    async function loginWithEmailAndPass(
        credentials: { email: string; password: string },
        thunkAPI
    ) {
        try {
            const { email, password } = credentials;
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            // const getUser = await getDoc(doc(firestoredb, "users", `${user.email}`));
            const getUser = await getDocs(
                query(collection(firestoredb, "users"), where("email", "==", user.email))
            );
            const userData = getRawData(getUser);
            return userData[0];
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const createNewUser = createAsyncThunk(
    "createNewUser",
    async function createNewUser(
        userCred: { name: string; email: string; password: string; role: string },
        thunkAPI
    ) {
        try {
            const newUser = await createUserWithEmailAndPassword(
                auth,
                userCred.email,
                userCred.password
            );
            const user = newUser.user;
            await addDoc(collection(firestoredb, "users"), {
                email: user.email,
                role: userCred.role,
                name: userCred.name,
            });
            return;
        } catch (error) {
            console.log(error);
        }
    }
);

export const signOutUser = createAsyncThunk("signOutUser", async function signOutUser(_, thunkAPI) {
    try {
        await signOut(auth);
        localStorage.clear();
    } catch (error) {
        console.log(error);
    }
});

export const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state = { ...state, status: "idle" };
        },
        logout: () => {},
    },
    extraReducers(builder) {
        builder.addCase(loginWithEmailAndPassword.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(loginWithEmailAndPassword.fulfilled, (state, action: any) => {
            console.log(action);
            localStorage.setItem("role", action.payload.role);
            state = {
                ...state,
                status: "success",
                authData: { email: action.payload.email, role: action.payload.role },
            };
            return state;
        });
        builder.addCase(loginWithEmailAndPassword.rejected, (state) => {
            state = { ...state, status: "error" };
            return state;
        });
        builder.addCase(createNewUser.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(createNewUser.fulfilled, (state, action: any) => {
            state = {
                ...state,
                status: "success",
            };
            return state;
        });
        builder.addCase(createNewUser.rejected, (state) => {
            state = { ...state, status: "error" };
            return state;
        });
        builder.addCase(signOutUser.pending, (state) => {
            state = { ...state, status: "loading" };
            return state;
        });
        builder.addCase(signOutUser.fulfilled, (state, action: any) => {
            state = {
                ...state,
                status: "success",
            };
            return state;
        });
        builder.addCase(signOutUser.rejected, (state) => {
            state = { ...state, status: "error" };
            return state;
        });
    },
});

export const { resetStatus } = authSlice.actions;
export default authSlice.reducer;
