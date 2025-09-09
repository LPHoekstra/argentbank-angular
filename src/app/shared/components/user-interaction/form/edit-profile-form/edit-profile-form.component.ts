import { Component, inject, output } from "@angular/core";
import { UserService } from "../../../../../service/user.service";
import { BaseForm } from "../../../../directive/base-form";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputLabel } from "../input-label/input-label.component";
import { Button } from "../../button/button.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "ab-editProfileForm",
    templateUrl: "./edit-profile-form.html",
    styleUrl: "./edit-profile-form.scss",
    imports: [ReactiveFormsModule, InputLabel, Button]
})
export class EditProfileForm extends BaseForm {
    userService = inject(UserService);

    isProfileUpdatedEvent = output<boolean>();

    protected serviceUserName: string = this.userService.userName;
    protected serviceFirstName: string = this.userService.firstName;
    protected serviceLastName: string = this.userService.lastName;

    protected isUserNameInvalid: boolean = false;

    public cancelForm() {
        this.isProfileUpdatedEvent.emit(false);
    }

    public profileUpdated() {
        this.isProfileUpdatedEvent.emit(true);
    }

    protected override buildForm(): FormGroup {
        return this.formGrp = new FormGroup({
            username: new FormControl("", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)
            ]),
            firstname: new FormControl({ value: this.serviceFirstName, disabled: true }),
            lastname: new FormControl({ value: this.serviceLastName, disabled: true })
        })
    }

    protected override handleSubmit(): void {
        const requestBody: PutProfileRequest = {
            userName: this.formGrp.value.username
        }

        this.userService.putProfile(requestBody).subscribe({
            next: (res) => {
                this.userService.userName = res.body.userName;
            },
            error: (err: HttpErrorResponse) => {
                this.error = err.error.message;
                this.isLoading = false;
            },
            complete: () => {
                this.profileUpdated();
            }
        })
    }

    protected override isFieldsValid(): boolean {
        this.isUserNameInvalid = false;

        if (this.formGrp.invalid) {
            this.error = "Erreur dans le formulaire";

            this.verifyUserName();

            return false;
        }

        return true;
    }

    /**
     * Verify if the user name is valid. Set {@link isUserNameInvalid} to true and set {@link error} if is invalid.
     * @returns true if the user name is invalid otherwise false
     */
    protected verifyUserName(): boolean {
        if (this.formUserName?.invalid) {
            this.isUserNameInvalid = true;
            this.error = "User name invalide";
            return true;
        }

        return false;
    }

    get formUserName() {
        return this.formGrp.get("username");
    }
}