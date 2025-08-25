import { Routes } from '@angular/router';
import { Authentification } from './authentification/authentification';
import { Home } from './home/home';

export const routes: Routes = [
    {
        path: "",
        component: Home,
        title: "ArgentBank"
    },
    {
        path: "login",
        component: Authentification,
        title: "Login to ArgentBank"
    },
    {
        path: "register",
        component: Authentification,
        title: "Register to ArgentBank"
    },
    {
        path: "logout",
        component: Authentification,
        title: "Logout from ArgentBank"
    }
];
