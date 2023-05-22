import { PropsWithChildren, ReactElement } from "react";
import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import guestsReducer from "../../redux/slices/guestSlices";
import roomReducer from "../../redux/slices/roomSlicers";
import staffReducer from "../../redux/slices/staffSlices";
import bookingReducer from "../../redux/slices/bookingSlices";
import restaurantReducer from "../../redux/slices/restaurantSlice";
import { Provider } from "react-redux";
import { AppStore, RootState } from "../../redux/types";
import { RenderOptions, render } from "@testing-library/react";
import { setupStore } from "../../redux/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}
const reducer = {
    guests: guestsReducer,
    rooms: roomReducer,
    staff: staffReducer,
    booking: bookingReducer,
    restaurant: restaurantReducer,
};

export function renderWithProviders(
    ui: ReactElement,
    {
        preloadedState,
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>) {
        return <Provider store={store}>{children}</Provider>;
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
