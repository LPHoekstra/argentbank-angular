import { Component } from "@angular/core";
import { Login } from "./login/login";
import { Router, RouterLink } from "@angular/router";
import { Logout } from "./logout/logout";
import { Register } from "./register/register";

@Component({
    imports: [Login, RouterLink, Logout, Register],
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