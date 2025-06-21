import { Component } from "@angular/core";
import { Login } from "./login/login";
import { Router, RouterLink } from "@angular/router";
import { Logout } from "./logout/logout";

@Component({
    imports: [Login, RouterLink, Logout],
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

    isOnLoginPage() {
        if (this.url === "/login") {
            return true;
        }

        return false;
    }

    setTitle() {
        if (this.isOnLoginPage()) {
            return "Sign In";
        }

        return "Sign Up";
    }
}