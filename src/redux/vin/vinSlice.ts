import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {VinResult} from "../../types/types.ts";
import type {IVinState} from "./vinTypes.ts";

const loadLastVins = (): string[] => {
    try {
        const data = localStorage.getItem("vin_history");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const fetchVinData = createAsyncThunk<{results: VinResult[], vin: string}, string, {rejectValue: string}>(
    'vin/fetchVinData',
    async (vin, {rejectWithValue}) => {
        try {
            const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue('Error in VIN request');
            }
            const results = data.Results as VinResult[];

            const errorCode = results.find(item => item.Variable === "Error Code")?.Value;
            const make = results.find(item => item.Variable === "Make")?.Value;
            if (errorCode !== "0" || !make) {
                return rejectWithValue('Invalid VIN: No vehicle found with this code.');
            }

            return {results: results, vin: vin};
        } catch (error) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return rejectWithValue(errorMessage);
        }
    }
)

const initialState: IVinState = {
    decodedData: null,
    lastVins: loadLastVins(),
    loading: false,
    error: null
}

const vinSlice = createSlice({
    name: "vin",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVinData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVinData.fulfilled, (state, action: PayloadAction<{results: VinResult[], vin: string}>) => {
                state.loading = false;
                state.decodedData = action.payload.results;

                    const newVin = action.payload.vin;
                    state.lastVins = [newVin, ...state.lastVins.filter(v => v !== newVin)
                    ].slice(0, 3);
            })
            .addCase(fetchVinData.rejected, (state, action) => {
                state.loading = false;
                state.error = state.error = action.payload ?? action.error.message ?? "Unknown error"
            })
    }
})

export const {clearError} = vinSlice.actions;
export default vinSlice.reducer;