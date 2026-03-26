import {configureStore} from "@reduxjs/toolkit";
import vinSlice from "./vin/vinSlice.ts";
import variablesSlice from "./variables/variablesSlice.ts";


export const store = configureStore({
    reducer: {
        vin: vinSlice,
        variables: variablesSlice,
    }
})

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("vin_history", JSON.stringify(state.vin.lastVins));
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;