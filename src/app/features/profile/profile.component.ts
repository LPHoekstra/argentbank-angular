import { Component, inject } from "@angular/core";
import { UserService } from "../../service/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Loader } from "../../shared/components/loader/loader.component";
import { EditProfileForm } from "../../shared/components/user-interaction/form/edit-profile-form/edit-profile-form.component";
import { BankAccount } from "../../model/bank-account-preview";
import { BankAccountPreview } from "../../shared/components/bank-account-preview/bank-account-preview";

@Component({
    selector: "ab-profile",
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.scss",
    imports: [Loader, EditProfileForm, BankAccountPreview]
})
export class Profile {
    protected userService = inject(UserService);
    protected router = inject(Router);

    protected bankAccountDataMock: Array<BankAccount> = [
        {
            title: "Argent Bank Checking (x8349)",
            amount: "$2,082.79",
            description: "Available Balance"
        },
        {
            title: "Argent Bank Savings (x6712)",
            amount: "$10,928.42",
            description: "Available Balance"
        },
        {
            title: "Argent Bank Checking (x8349)",
            amount: "$184.30",
            description: "Current Balance"
        }
    ]

    protected isDataLoaded: boolean = false;
    protected error: string | null = null;
    protected isFormOpen: boolean = false;
    protected isProfileUpdated: boolean = false;

    ngOnInit() {
        this.userService.getProfile().subscribe(
            {
                next: (value) => {
                    this.userService.setUser(value.body);
                    this.isDataLoaded = true;
                },
                error: (err: HttpErrorResponse) => {
                    // TODO need a refactoring to handle different error
                    console.error(err)
                    this.error = "Erreur lors de la récupération des informations";
                },
            }
        )
    }

    /**
     * if the form return true, the user profile as been updated with success. If it return false,
     * the form as been canceled.
     * @param event 
     */
    handleForm(event: boolean) {
        if (event) {
            this.isProfileUpdated = true;
        } else {
            this.isProfileUpdated = false;
        }

        this.closeForm();
    }

    openForm() {
        this.isFormOpen = true;
        this.isProfileUpdated = false;
    }

    closeForm() {
        this.isFormOpen = false;
    }
}