import { Component, inject } from "@angular/core";
import { InputLabel } from "../../user-interaction/form/input-label/input-label";
import { Button } from "../../user-interaction/button/button";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../../userService/user-service";

@Component({
    selector: "ab-register",
    templateUrl: "./register.html",
    imports: [InputLabel, Button, ReactiveFormsModule]
})

export class Register {
    registerForm = new FormGroup({
        email: new FormControl(""),
        password: new FormControl(""),
        firstName: new FormControl(""),
        lastName: new FormControl(""),
        userName: new FormControl("")
    })

    userService = inject(UserService)

    handleSubmit() {
        // this.userService.register(this.registerForm.value)
        console.log(this.registerForm.value)
    }
}