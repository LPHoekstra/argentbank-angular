import { Component, inject } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Loader } from "../../shared/components/loader/loader.component";

@Component({
    selector: "ab-logout",
    templateUrl: "./logout.component.html",
    styleUrl: "./logout.component.scss",
    imports: [Loader]
})
export class Logout {
    authService = inject(AuthService);
    router = inject(Router);

    ngOnInit() {
        if (this.authService.isAuthenticated) {
            this.authService.logout().subscribe({
                next: () => {
                    this.router.navigate([""]);
                },
                error: (err: HttpErrorResponse) => {
                    console.error(err.message);
                    this.router.navigate([""]);
                }
            });
        } else {
            this.router.navigate(["/login"]);
        }
    }
}