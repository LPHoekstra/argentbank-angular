import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";

export function credentialsInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    if (req.withCredentials) {
        const token = inject(AuthService).token;

        if (token) {
            const reqWithHeader: HttpRequest<unknown> = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });

            return next(reqWithHeader);
        }
    }

    return next(req);
}