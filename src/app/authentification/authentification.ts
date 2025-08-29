import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Logout } from "./logout/logout";
import { RegisterForm } from "../user-interaction/form/register-form/register-form";
import { LoginForm } from "../user-interaction/form/login-form/login-form";

@Component({
    imports: [LoginForm, RouterLink, Logout, RegisterForm],
    selector: "ab-authentification",
    templateUrl: "./authentification.html",
    styleUrl: "./authentification.scss"
})

export class Authentification {
    protected url: string;
    protected title: string;

    constructor(router: Router) {
        this.url = router.url;
        this.title = this.setTitle();
    }

    isOnPage(url: string) {
        if (this.url === url) {
            return true;
        }

        return false;
    }

    setTitle() {
        if (this.isOnPage("/login")) {
            return "Sign In";
        }

        return "Sign Up";
    }
}