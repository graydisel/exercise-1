import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {VariablesResult} from "../../types/types.ts";
import type {IVariablesState} from "./variablesTypes.ts";

export const fetchVariables = createAsyncThunk<VariablesResult[], void, {rejectValue: string}>(
    "variables/fetchVariables",
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json');
            if (!response.ok) {
                return rejectWithValue('Failed to fetch variables list');
            }

            const data = await response.json();

            return data.Results;
        } catch (error) {
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return rejectWithValue(errorMessage);
        }
}
);

const initialState: IVariablesState = {
    allVariables: null,
    loading: false,
    error: null,
}

const variablesSlice = createSlice({
    name: "variables",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVariables.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVariables.fulfilled, (state, action) => {
                state.loading = false;
                state.allVariables = action.payload;
            })
            .addCase(fetchVariables.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to load variables";
            })
    }
});

export default variablesSlice.reducer;