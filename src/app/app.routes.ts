import { Routes } from '@angular/router';
import { Authentification } from './features/authentification/authentification.component';
import { Home } from './features/home/home.component';
import { Profile } from './features/profile/profile.component';
import { authGuard } from './guards/auth-guard';
import { Logout } from './features/logout/logout.component';

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
        component: Logout,
        title: "Logout from ArgentBank"
    },
    {
        path: "profile",
        component: Profile,
        title: "Profile",
        canActivate: [authGuard]
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
