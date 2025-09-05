import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Button } from "../../button/button.component";
import { InputLabel } from "../input-label/input-label.component";
import { UserService } from "../../../../../service/user.service";
import { BaseForm } from "../../../../directive/base-form";
import { passwordValidator } from "../../../../directive/password-validator.directive";


// TODO improve the field validation and set an error msg with better precision about the problem
@Component({
    selector: "ab-register-form",
    templateUrl: "./register-form.component.html",
    imports: [InputLabel, Button, ReactiveFormsModule]
})
export class RegisterForm extends BaseForm {
    userService = inject(UserService);
    router = inject(Router);

    protected isEmailInvalid: boolean = false;
    protected isPasswordInvalid: boolean = false;
    protected isUserNameInvalid: boolean = false;
    protected isFirstNameInvalid: boolean = false;
    protected isLastNameInvalid: boolean = false;

    protected override handleSubmit(): void {
        const registerData: RegisterRequest = {
            email: this.formGrp.value.email as string,
            password: this.formGrp.value.password as string,
            firstName: this.formGrp.value.firstname as string,
            lastName: this.formGrp.value.lastname as string,
            userName: this.formGrp.value.username as string
        }

        this.userService.register(registerData).subscribe({
            error: (err: HttpErrorResponse) => {
                this.handleErrorResponse(err);
            },
            complete: () => {
                this.router.navigate(["/login"]);
            }
        });
    }

    protected override buildForm(): FormGroup {
        return this.formGrp = new FormGroup({
            email: new FormControl("", [
                Validators.email,
                Validators.required,
            ]),
            password: new FormControl("", passwordValidator()),
            firstname: new FormControl("", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)
            ]),
            lastname: new FormControl("", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)
            ]),
            username: new FormControl("", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)
            ])
        });
    }

    protected override isFieldsValid(): boolean {
        this.isEmailInvalid = false;
        this.isPasswordInvalid = false;
        this.isUserNameInvalid = false;
        this.isFirstNameInvalid = false;
        this.isLastNameInvalid = false;

        if (this.formGrp.invalid) {
            this.error = "Erreur dans le formulaire";

            // use a condition so that when a field is invalid, it does not iterate all methods
            if (this.verifyUserName() ||
                this.verifyFirstName() ||
                this.verifyLastName() ||
                this.verifyEmail() ||
                this.verifyPassword()
            ) {
                return false;
            }

            return false
        }

        return true;
    }

    /**
     * Verify if the user name is valid. Set {@link isUserNameInvalid} to true and set {@link error} if is invalid.
     * @returns true if the user name is invalid otherwise false
     */
    protected verifyUserName(): boolean {
        if (this.userName?.invalid) {
            this.isUserNameInvalid = true;
            this.error = "User name invalide";
            return true;
        }

        return false;
    }

    /**
     * Verify if the first name is valid. Set {@link isFirstNameInvalid} to true and set {@link error} if is invalid.
     * @returns true if the first name is invalid otherwise false
     */
    protected verifyFirstName(): boolean {
        if (this.firstName?.invalid) {
            this.isFirstNameInvalid = true;
            this.error = "Prénom invalide";
            return true;
        }

        return false;
    }

    /**
     * Verify if the last name is valid. Set {@link isLastNameInvalid} to true and set {@link error} if is invalid.
     * @returns true if the last name is invalid otherwise false
     */
    protected verifyLastName(): boolean {
        if (this.lastName?.invalid) {
            this.isLastNameInvalid = true;
            this.error = "Nom invalide";
            return true;
        }

        return false;
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

    get userName() {
        return this.formGrp.get("username");
    }

    get firstName() {
        return this.formGrp.get("firstname");
    }

    get lastName() {
        return this.formGrp.get("lastname");
    }

    get email() {
        return this.formGrp.get("email");
    }

    get password() {
        return this.formGrp.get("password");
    }
}