import { Routes } from '@angular/router';
import { Authentification } from './authentification/authentification';

export const routes: Routes = [
    {
        path: "login",
        component: Authentification,
        title: "Login to ArgentBank"
    },
    {
        path: "logout",
        component: Authentification,
        title: "Logout from ArgentBank"
    }
];
