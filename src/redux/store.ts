import { configureStore } from "@reduxjs/toolkit";
import guestsReducer from "./slices/guestSlices";
import roomReducer from "./slices/roomSlicers";
import staffReducer from "./slices/staffSlices";
import bookingReducer from "./slices/bookingSlices";
import restaurantReducer from "./slices/restaurantSlice";

export default configureStore({
	reducer: {
		guests: guestsReducer,
		rooms: roomReducer,
		staff: staffReducer,
		booking: bookingReducer,
		restaurant: restaurantReducer,
	},
});
