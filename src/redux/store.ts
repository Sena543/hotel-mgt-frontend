import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import guestsReducer from "./slices/guestSlices";
import roomReducer from "./slices/roomSlicers";
import staffReducer from "./slices/staffSlices";
import bookingReducer from "./slices/bookingSlices";
import restaurantReducer from "./slices/restaurantSlice";
import { RootState } from "./types";

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: {
            guests: guestsReducer,
            rooms: roomReducer,
            staff: staffReducer,
            booking: bookingReducer,
            restaurant: restaurantReducer,
        },
        preloadedState,
    });
}

export default configureStore({
    reducer: {
        guests: guestsReducer,
        rooms: roomReducer,
        staff: staffReducer,
        booking: bookingReducer,
        restaurant: restaurantReducer,
    },
});
