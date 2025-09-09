import { Component, inject } from "@angular/core";
import { UserService } from "../../service/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Loader } from "../../shared/components/loader/loader.component";
import { EditProfileForm } from "../../shared/components/user-interaction/form/edit-profile-form/edit-profile-form.component";

@Component({
    selector: "ab-profile",
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.scss",
    imports: [Loader, EditProfileForm]
})
export class Profile {
    protected userService = inject(UserService);
    protected router = inject(Router);

    protected isDataLoaded: boolean = false;
    protected error: string | null = null;
    protected isFormOpen: boolean = false;
    protected isProfileUpdated: boolean = false;

    ngOnInit() {
        this.userService.getProfile().subscribe(
            {
                next: (value) => {
                    this.userService.setUserData(value.body);
                    this.isDataLoaded = true;
                },
                error: (err: HttpErrorResponse) => {
                    // TODO need a refactoring to handle different error
                    console.error(err)
                    this.error = "Erreur lors de la récupération des informations";
                    if (err.status === 401) {
                        localStorage.removeItem("token")
                        this.router.navigate(["/login"])
                    }
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