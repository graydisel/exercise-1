import { NavLink } from "react-router-dom";
import "../../assets/css/Header.css";

export const Header = () => {
    return (
        <header className="site-header">
            <div className="container site-header__inner">
                <div className="site-header__brand" aria-label="VIN Decoder">
                    VIN Decoder
                </div>

                <nav className="site-nav" aria-label="Primary navigation">
                    <ul className="site-nav__list">
                        <li className="site-nav__item">
                            <NavLink to="/" className="site-nav__link">
                                Search
                            </NavLink>
                        </li>
                        <li className="site-nav__item">
                            <NavLink to="/variables" className="site-nav__link">
                                Variables
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}