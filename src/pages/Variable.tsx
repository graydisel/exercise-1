import {Link, useParams} from "react-router-dom";
import {selectVariableById, variablesSelector} from "../redux/variables/variablesSelectors.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux/store.ts";
import {useEffect} from "react";
import {fetchVariables} from "../redux/variables/variablesSlice.ts";

export const Variable = () => {
    const { variableId } = useParams<{ variableId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const {allVariables, loading} = useSelector(variablesSelector)

    const variable = useSelector((state: RootState) =>
        selectVariableById(state, Number(variableId))
    );

    useEffect(() => {
        if (!allVariables) {
            dispatch(fetchVariables());
        }
    }, [dispatch, allVariables]);

    if (loading) return <p>Loading...</p>

    if (!variable) {
        return (
            <div>
                <p>Variable not found or list not loaded.</p>
                <Link to="/variables">Back to list</Link>
            </div>
        );
    }

    return (
        <article>
            <Link to="/variables">← Back to list</Link>
            <h1>{variable.Name}</h1>
            <p><strong>Group:</strong> {variable.GroupName}</p>
            <div dangerouslySetInnerHTML={{ __html: variable.Description }} />
        </article>
    );
}