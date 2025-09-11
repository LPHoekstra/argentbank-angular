import { NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { UserService } from "../../../service/user.service";
import { AuthService } from "../../../service/auth.service";

@Component({
    imports: [NgOptimizedImage, RouterLink],
    selector: "ab-header",
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss"
})

export class Header {
    userService = inject(UserService);
    authService = inject(AuthService);

    get authRoute() {
        return this.authService.isAuthenticated ? "/logout" : "/login";
    }

    get authText() {
        return this.authService.isAuthenticated ? "Logout" : "Sign in";
    }
}