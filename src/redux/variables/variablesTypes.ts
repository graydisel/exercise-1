import type {VariablesResult} from "../../types/types.ts";

export interface IVariablesState {
    allVariables: VariablesResult[] | null,
    loading: boolean,
    error: string | null,
}