import { Component } from "@angular/core";
import { InputLabel } from "../../user-interaction/form/input-label/input-label";
import { Button } from "../../user-interaction/button/button";

@Component({
    selector: "ab-login",
    templateUrl: "./login.html",
    imports: [InputLabel, Button]
})

export class Login {
    protected email: string = "";
    protected password: string = "";

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }
}