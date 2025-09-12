import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

/**
 * If a 401 http code is send by the API, clear the session and navigate
 * the user to the login page.
 * @param req 
 * @param next 
 * @returns 
 */
export function notAuthorizedInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);
    const router = inject(Router);

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if (!err.url?.endsWith("/login") && err.status === 401) {
                authService.clearSession();
                router.navigate(["/login"]);
            }

            return throwError(() => err);
        })
    )
}