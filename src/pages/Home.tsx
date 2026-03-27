import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../redux/store.ts";
import {lastVinsSelector, selectFilteredVinData, vinSelector} from "../redux/vin/vinSelectors.ts";
import {clearError, fetchVinData} from "../redux/vin/vinSlice.ts";
import {useState} from "react";
import * as React from "react";
import "../assets/css/Home.css"
import {Link} from "react-router-dom";

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {loading, error} = useSelector(vinSelector);
    const [inputValue, setInputValue] = useState("");
    const [errorValue, setErrorValue] = useState<string | null>(null);
    const filteredVin = useSelector(selectFilteredVinData);
    const lastVins = useSelector(lastVinsSelector);

    function validate(value: string) {
        if (!value.trim()) return "VIN is required";
        if (value.length !== 17) return "VIN is more than 17 characters long";
        if (/[^A-HJ-NPR-Z0-9]/i.test(value)) return "VIN contains invalid characters (I, O, Q are not allowed)";
        return null;
    }

    function handleSubmit(e: React.BaseSyntheticEvent) {
        e.preventDefault();
        dispatch(clearError());
        const validationError = validate(inputValue);
        if (validationError) {
            setErrorValue(validationError);
            return;
        }

        setErrorValue(null);
        dispatch(fetchVinData(inputValue.toUpperCase()));
    }
    

    return (
        <section className="page page--home" aria-labelledby="home-title">
            <h1 id="home-title">VIN Decoder</h1>

            <form className={"search-form"} onSubmit={handleSubmit}>
                <label className="field-label" htmlFor="vin">Write your VIN code here.</label>

                <div className="form-row">
                    <input value={inputValue}
                           className="text-input"
                           type="text"
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               setInputValue(e.target.value);
                               if (errorValue) setErrorValue(null);
                           }}
                           placeholder="Enter VIN code"
                           name="vin"
                           id="vin"
                           autoComplete="off"
                           inputMode="text"
                    />
                    <button className="btn btn--primary" type={'submit'}>Decode</button>
                </div>

                {errorValue && <p className="form-error" role="alert">{errorValue}</p>}
                {error && <p className="form-error" role="alert">{error}</p>}

                <aside className="search-history" aria-label="Search history">
                    <h2 className="section-title">Search history</h2>
                    {lastVins.length > 0 ? (
                        <ul className="tag-list">
                            {lastVins.map((vin) => (
                                <li key={vin} className="tag-list__item">
                                    <button
                                        className="tag"
                                        type="button"
                                        onClick={() => {
                                            setInputValue(vin);
                                            dispatch(fetchVinData(vin))
                                        }}
                                    >
                                        {vin}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="muted">No VINs yet.</p>
                    )}
                </aside>
            </form>

            {loading && <p>Loading...</p>}

            {filteredVin && (
                <dl className="results-list" aria-label="VIN decode results">
                    {filteredVin.map((result) => (
                        <div key={result.VariableId} className="result-item">
                            <dt>
                                <Link to={`/variables/${result.VariableId}`}>
                                    {result.Variable}
                                </Link>
                            </dt>
                            <dd>{result.Value}</dd>
                        </div>
                    ))}
                </dl>
            )}

        </section>
    )
}