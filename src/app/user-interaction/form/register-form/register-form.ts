import { Component, inject } from "@angular/core";
import { InputLabel } from "../input-label/input-label";
import { Button } from "../../button/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../../userService/user-service";
import { BaseForm } from "../base-form";
import { Router } from "@angular/router";

@Component({
    selector: "ab-register-form",
    templateUrl: "./register-form.html",
    imports: [InputLabel, Button, ReactiveFormsModule]
})

export class RegisterForm extends BaseForm {
    userService = inject(UserService);
    router = inject(Router);

    protected override onSubmit(): void {
        console.log(this.formGrp.value);

        const registerData: RegisterRequest = {
            email: this.formGrp.value.email as string,
            password: this.formGrp.value.password as string,
            firstName: this.formGrp.value.firstname as string,
            lastName: this.formGrp.value.lastname as string,
            userName: this.formGrp.value.username as string
        }

        this.userService.register(registerData).subscribe({
            error: (err) => {
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
                Validators.required
            ]),
            password: new FormControl("", [
                Validators.required
            ]),
            firstname: new FormControl("", [
                Validators.required,
                Validators.minLength(2)
            ]),
            lastname: new FormControl("", [
                Validators.required,
                Validators.minLength(2)
            ]),
            username: new FormControl("", [
                Validators.required,
            ])
        });
    }

    // TODO implement an error message for each field
    protected override isFieldsValid(): boolean {
        if (this.formGrp.invalid) {
            this.error = "Erreur dans le formulaire";

            if (this.formGrp.get("email")?.invalid) {
                this.error = "Email invalide";
            }

            else if (this.formGrp.get("password")?.invalid) {
                this.error = "Mot de passe invalide";
            }

            return false;
        }

        return true;
    }
}