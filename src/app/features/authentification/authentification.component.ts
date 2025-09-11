import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Logout } from "../logout/logout.component";
import { LoginForm } from "../../shared/components/user-interaction/form/login-form/login-form.component";
import { RegisterForm } from "../../shared/components/user-interaction/form/register-form/register-form.component";

@Component({
    imports: [LoginForm, RouterLink, Logout, RegisterForm],
    selector: "ab-authentification",
    templateUrl: "./authentification.component.html",
    styleUrl: "./authentification.component.scss"
})

export class Authentification {
    protected url: string;
    protected title: string;

    constructor(router: Router) {
        this.url = router.url;
        this.title = this.setTitle();
    }

    isOnPage(url: string) {
        return this.url === url ? true : false;
    }

    setTitle() {
        return this.isOnPage("/login") ? "Sign In" : "Sign Up";
    }
}