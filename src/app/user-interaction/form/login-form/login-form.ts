import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../../userService/user-service";
import { Router } from "@angular/router";
import { BaseForm } from "../base-form";
import { InputLabel } from "../input-label/input-label";
import { Button } from "../../button/button";

@Component({
    selector: "ab-login-form",
    templateUrl: "./login-form.html",
    styleUrl: "./login-form.scss",
    imports: [InputLabel, Button, ReactiveFormsModule]
})

export class LoginForm extends BaseForm {
    private userService = inject(UserService);
    private router = inject(Router);

    protected isEmailInvalid: boolean = false;
    protected isPasswordInvalid: boolean = false;

    protected override onSubmit() {
        const loginData: LoginRequest = this.formGrp.value as LoginRequest;

        this.userService.login(loginData).subscribe({
            next: (value) => {
                localStorage.setItem("token", value.body.token);
            },
            error: (err) => {
                this.handleErrorResponse(err);
            },
            complete: () => {
                this.router.navigate(["/profile"]);
            }
        });
    }

    protected override buildForm(): FormGroup {
        return this.formGrp = new FormGroup({
            email: new FormControl("", [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl("", Validators.required)
        })
    }

    protected override isFieldsValid(): boolean {
        this.isEmailInvalid = false;
        this.isPasswordInvalid = false;

        if (this.formGrp.invalid) {
            if (this.email?.invalid) {
                this.isEmailInvalid = true;
                this.error = "Email invalide";
            }

            else if (this.password?.invalid) {
                this.isPasswordInvalid = true;
                this.error = "Mot de passe invalide";
            }

            return false;
        }

        return true;
    }

    get email() {
        return this.formGrp.get("email");
    }

    get password() {
        return this.formGrp.get("password");
    }
}