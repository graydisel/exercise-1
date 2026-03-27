import {Footer} from "./Footer.tsx";
import {matchRoutes, Outlet, useLocation} from "react-router-dom";
import {Header} from "./Header.tsx";
import { useEffect } from "react";
import { routes } from '../routes';

export const Layout = () => {
    const location = useLocation();

  useEffect(() => {
    const matches = matchRoutes(routes, location);
    
    if (matches) {
      const route = matches[matches.length - 1].route;

      if (route.title) {
        document.title = route.title;
      }
    }
  }, [location]);
  
    return (
        <div className="app-shell">
            <Header/>
            <main className="container app-main" id="main">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}