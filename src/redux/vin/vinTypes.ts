import type {VinResult} from "../../types/types.ts";

export interface IVinState {
    decodedData: VinResult[] | null,
    lastVins: string[],
    loading: boolean,
    error: string | null,
}