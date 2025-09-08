import { Component, inject } from "@angular/core";
import { UserService } from "../../service/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Loader } from "../../shared/components/loader/loader.component";

// create a loader during the fetch
@Component({
    selector: "ab-profile",
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.scss",
    imports: [Loader]
})
export class Profile {
    protected userService = inject(UserService);
    protected router = inject(Router);

    protected error: string | null = null;
    protected isFormOpen: boolean = false;
    protected successMsg: string | null = null;

    ngOnInit() {
        this.userService.getProfile().subscribe(
            {
                next: (value) => {
                    this.userService.setUserData(value.body);
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
}