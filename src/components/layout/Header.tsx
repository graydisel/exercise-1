import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <div className="header">
            <h3>Header</h3>
            <div>
                <Link to={"/"}>Search</Link>
                <Link to={"/variables"}>Variables</Link>
            </div>
        </div>
    )
}