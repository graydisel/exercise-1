import type {RootState} from "../store.ts";
import {createSelector} from "@reduxjs/toolkit";

export const vinSelector = (state: RootState) => state.vin;

export const lastVinsSelector = (state: RootState) => state.vin.lastVins;

const selectRawDecodedData = (state: RootState) => state.vin.decodedData;

export const selectFilteredVinData = createSelector(
    [selectRawDecodedData],
    (decodedData) => {
        if (!decodedData) return null;

        console.log("Filtering logic executed!");
        return decodedData.filter(item =>
            item.Value &&
            item.Value.trim() !== "" &&
            item.Value.toLowerCase() !== "null"
        );
    }
);