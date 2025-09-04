import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../../userService/user-service";
import { Router } from "@angular/router";
import { BaseForm } from "../base-form";
import { InputLabel } from "../input-label/input-label";
import { Button } from "../../button/button";
import { HttpErrorResponse } from "@angular/common/http";
import { passwordValidator } from "../form-control-validator/password-validator";

@Component({
    selector: "ab-login-form",
    templateUrl: "./login-form.html",
    imports: [InputLabel, Button, ReactiveFormsModule]
})
export class LoginForm extends BaseForm {
    private userService = inject(UserService);
    private router = inject(Router);

    protected isEmailInvalid: boolean = false;
    protected isPasswordInvalid: boolean = false;

    protected override handleSubmit() {
        const loginData: LoginRequest = this.formGrp.value as LoginRequest;

        this.userService.login(loginData).subscribe(
            {
                next: (value) => {
                    localStorage.setItem("token", value.body.token);
                },
                error: (err: HttpErrorResponse) => {
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
            password: new FormControl("", passwordValidator())
        })
    }

    protected override isFieldsValid(): boolean {
        this.isEmailInvalid = false;
        this.isPasswordInvalid = false;

        if (this.formGrp.invalid) {
            this.error = "Erreur dans le formulaire";

            // use a condition so that when a field is invalid, it does not iterate all methods
            if (this.verifyEmail() || this.verifyPassword()) {
                return false;
            }

            return false;
        }

        return true;
    }

    /**
     * Verify if the email is valid. Set {@link isEmailInvalid} to true and set {@link error} if is invalid.
     * @returns true if the email is invalid otherwise false
     */
    protected verifyEmail(): boolean {
        if (this.email?.invalid) {
            this.isEmailInvalid = true;
            this.error = "Email invalide";
            return true;
        }

        return false;
    }

    /**
     * Verify if the password is valid. Set {@link isPasswordInvalid} to true and set {@link error} if is invalid.
     * @returns true if the password is invalid otherwise false
     */
    protected verifyPassword(): boolean {
        if (this.password?.invalid) {
            this.isPasswordInvalid = true;
            this.error = this.password.getError("password");

            return true;
        }

        return false;
    }

    get email() {
        return this.formGrp.get("email");
    }

    get password() {
        return this.formGrp.get("password");
    }
}