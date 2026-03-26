import type {RootState} from "../store.ts";
import {createSelector} from "@reduxjs/toolkit";

export const variablesSelector = (state: RootState) => state.variables;

const selectAllVars = (state: RootState) => state.variables.allVariables;

export const selectVariableById = createSelector(
    [selectAllVars, (_state: RootState, id: number) => id],
    (allVariables, id) => allVariables?.find(v => v.ID === id)
);