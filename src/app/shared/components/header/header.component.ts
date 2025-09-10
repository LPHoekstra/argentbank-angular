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

    protected isConnected: boolean = this.authService.isAuthenticated();

    getConnectionRedirection() {
        if (this.isConnected) {
            return "/logout";
        }

        return "/login";
    }

    getConnectionStatus() {
        if (this.isConnected) {
            return "Logout";
        }

        return "Sign in";
    }
}