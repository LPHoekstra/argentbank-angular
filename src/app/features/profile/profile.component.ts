import { Component, inject } from "@angular/core";
import { UserService } from "../../service/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
    selector: "ab-profile",
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.scss",
})
export class Profile {
    protected userService = inject(UserService);
    protected router = inject(Router);

    protected userFirstName!: string;
    protected userLastName!: string;
    protected isFormOpen: boolean = false;
    protected successMsg: string = "";

    ngOnInit() {
        this.userService.getProfile().subscribe(
            {
                next: (value) => {
                    // TODO store user information somewhere
                },
                error: (err: HttpErrorResponse) => {
                    console.error(err.statusText)
                    // this.router.navigate(["/login"]);
                }
            }
        )
    }
}