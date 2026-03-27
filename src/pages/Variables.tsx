import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../redux/store.ts";
import {variablesSelector} from "../redux/variables/variablesSelectors.ts";
import {fetchVariables} from "../redux/variables/variablesSlice.ts";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import "../assets/css/Variables.css";

export const Variables = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {allVariables, loading, error} = useSelector(variablesSelector)

    useEffect(() => {
        if (!allVariables) {
            dispatch(fetchVariables());
        }
    }, [dispatch, allVariables]);

    return (
        <section className="page page--variables" aria-labelledby="variables-title">
            <h1 id="variables-title">Vehicle Variables Guide</h1>
            {error && <p className="form-error" role="alert">{error}</p>}
            {loading && <p>Loading directory...</p>}

            <ul className="variables-grid" aria-label="Variables list">
                {allVariables?.map(variable => (
                    <li key={variable.ID} className="variables-grid__item">
                        <article className="variable-card">
                            <h2 className="variable-card__title">
                                <Link to={`/variables/${variable.ID}`}>
                                    {variable.Name}
                                </Link>
                            </h2>
                            <p className="muted">Group: {variable.GroupName}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    )
}