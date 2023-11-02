import { PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc, where, query, updateDoc, arrayUnion, doc } from "firebase/firestore/lite";
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
	async function loginWithEmailAndPass(credentials: { email: string; password: string }, thunkAPI) {
		try {
			const { email, password } = credentials;
			const userCredentials = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredentials.user;
			// const getUser = await getDoc(doc(firestoredb, "users", `${user.email}`));
			const getUser = await getDocs(query(collection(firestoredb, "users"), where("email", "==", user.email)));
			const userData = getRawData(getUser);
			return userData[0];
		} catch (error) {
			console.log(error);
		}
	}
);

export const signOutUser = createAsyncThunk(
	"signOutUser",
	async function signOut(credentials: { email: string; password: string }, thunkAPI) {
		try {
		} catch (error) {
			console.log(error);
		}
	}
);

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
	},
});

export const { resetStatus } = authSlice.actions;
export default authSlice.reducer;
