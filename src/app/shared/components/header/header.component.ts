import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    imports: [NgOptimizedImage, RouterLink],
    selector: "ab-header",
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss"
})

export class Header {
    // TODO get somewhere the connection status
    protected isConnected: boolean = false;
    protected userName: string | null;

    constructor() {
        this.userName = localStorage.getItem("userName")
    }

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