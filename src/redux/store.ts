import { configureStore } from "@reduxjs/toolkit";
import guestsReducer from "./slices/guestSlices";

export default configureStore({
	reducer: {
		guests: guestsReducer,
	},
});
