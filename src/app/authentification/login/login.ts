import { Component } from "@angular/core";
import { InputLabel } from "../../user-interaction/form/input-label/input-label";
import { Button } from "../../user-interaction/button/button";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "ab-login",
    templateUrl: "./login.html",
    imports: [InputLabel, Button, ReactiveFormsModule]
})

export class Login {
    loginForm = new FormGroup({
        email: new FormControl(""),
        password: new FormControl("")
    })

    handleSubmit() {
        // TODO handle
        alert(this.loginForm.value.email + " | " + this.loginForm.value.password)
    }
}