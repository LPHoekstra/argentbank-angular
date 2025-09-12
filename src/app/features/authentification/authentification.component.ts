import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { LoginForm } from "../../shared/components/user-interaction/form/login-form/login-form.component";
import { RegisterForm } from "../../shared/components/user-interaction/form/register-form/register-form.component";
import { AuthService } from "../../service/auth.service";

/**
 * Render the login form or register form. 
 */
@Component({
    imports: [LoginForm, RouterLink, RegisterForm],
    selector: "ab-authentification",
    templateUrl: "./authentification.component.html",
    styleUrl: "./authentification.component.scss"
})
export class Authentification {
    authService = inject(AuthService);
    router = inject(Router);

    protected url: string;
    protected title: string;

    constructor(router: Router) {
        this.url = router.url;
        this.title = this.setTitle();
    }

    ngOnInit() {
        if (this.authService.isAuthenticated) {
            this.router.navigate(["/profile"]);
        }
    }

    isOnPage(url: string) {
        return this.url === url ? true : false;
    }

    setTitle() {
        return this.isOnPage("/login") ? "Sign In" : "Sign Up";
    }
}