import {Home} from "../pages/Home.tsx";
import {Variables} from "../pages/Variables.tsx";
import {Variable} from "../pages/Variable.tsx";

export const routes = [
    {
        title: 'Home',
        path: '',
        element: <Home/>
    },
    {
        title: 'Variables',
        path: '/variables',
        element: <Variables/>
    },
    {
        title: 'Variable',
        path: '/variables/:variableId',
        element: <Variable/>
    }
]