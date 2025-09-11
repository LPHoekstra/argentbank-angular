import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

export function notAuthorizedInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);
    const router = inject(Router);

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if (!err.url?.endsWith("/login") && err.status === 401) {
                console.log("Disconnected");
                authService.clearSession();
                router.navigate(["/login"]);
            }

            return throwError(() => err);
        })
    )
}