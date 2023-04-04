import { configureStore } from "@reduxjs/toolkit";
import guestsReducer from "./slices/guestSlices";
import roomReducer from "./slices/roomSlicers";
import staffReducer from "./slices/staffSlices";

export default configureStore({
	reducer: {
		guests: guestsReducer,
		rooms: roomReducer,
		staff: staffReducer,
	},
});
