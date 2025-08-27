import { Component, inject } from "@angular/core";
import { InputLabel } from "../../user-interaction/form/input-label/input-label";
import { Button } from "../../user-interaction/button/button";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../userService/user-service";
import { Router } from "@angular/router";

@Component({
    selector: "ab-login",
    templateUrl: "./login.html",
    styleUrl: "./login.scss",
    imports: [InputLabel, Button, ReactiveFormsModule]
})

export class Login {
    private userService = inject(UserService);
    private router = inject(Router);

    loginFormGrp = new FormGroup({
        email: new FormControl("", [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl("", Validators.required)
    })

    protected isLoading: boolean = false;
    protected error: string = "";
    protected isEmailInvalid: boolean = false;
    protected isPasswordInvalid: boolean = false;

    handleSubmit() {

        if (!this.isFieldsValid()) {
            return;
        };

        this.error = "";
        this.isLoading = true;

        const loginForm: LoginRequest = this.loginFormGrp.value as LoginRequest;

        this.userService.login(loginForm).subscribe({
            next: (value) => {
                localStorage.setItem("token", value.body.token);
            },
            error: (err) => {
                console.error(err);
                this.error = err.error.message;
                this.isLoading = false;
                // TODO handle error on http status
            },
            complete: () => {
                this.isLoading = false;
                this.router.navigate(["/profile"]);
            }
        });
    }

    isFieldsValid(): boolean {
        this.isEmailInvalid = false;
        this.isPasswordInvalid = false;

        if (this.email?.invalid) {
            this.isEmailInvalid = true;
            this.error = "Email invalide";
            return false;
        }

        if (this.password?.invalid) {
            this.isPasswordInvalid = true;
            this.error = "Mot de passe invalide";
            return false;
        }

        return true;
    }

    get email() {
        return this.loginFormGrp.get("email");
    }

    get password() {
        return this.loginFormGrp.get("password");
    }
}