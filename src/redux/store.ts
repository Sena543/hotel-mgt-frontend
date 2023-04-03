import { configureStore } from "@reduxjs/toolkit";
import guestsReducer from "./slices/guestSlices";
import roomReducer from "./slices/roomSlicers";

export default configureStore({
	reducer: {
		guests: guestsReducer,
		rooms: roomReducer,
	},
});
