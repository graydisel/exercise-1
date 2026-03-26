import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../redux/store.ts";
import {variablesSelector} from "../redux/variables/variablesSelectors.ts";
import {fetchVariables} from "../redux/variables/variablesSlice.ts";
import {useEffect} from "react";
import {Link} from "react-router-dom";

export const Variables = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {allVariables, loading, error} = useSelector(variablesSelector)

    useEffect(() => {
        if (!allVariables) {
            dispatch(fetchVariables());
        }
    }, [dispatch, allVariables]);

    return (
        <main>
            <h1>Vehicle Variables Guide</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>Loading directory...</p>}

            <div className="variables-grid">
                {allVariables?.map(variable => (
                    <div key={variable.ID} className="variable-card">
                        <Link to={`/variables/${variable.ID}`}>
                            <strong>{variable.Name}</strong>
                        </Link>
                        <p>Group: {variable.GroupName}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}