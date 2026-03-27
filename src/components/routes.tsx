import {Home} from "../pages/Home.tsx";
import {Variables} from "../pages/Variables.tsx";
import {Variable} from "../pages/Variable.tsx";

export const routes = [
    {
        title: 'VIN Decoder | Home',
        path: '',
        element: <Home/>
    },
    {
        title: 'VIN Decoder | Variables Guide',
        path: '/variables',
        element: <Variables/>
    },
    {
        title: 'Variable Details',
        path: '/variables/:variableId',
        element: <Variable/>
    }
]