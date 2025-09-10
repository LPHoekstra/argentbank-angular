import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, tap } from "rxjs";
import { UserService } from "../service/user.service";

export function credentialsInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    if (req.withCredentials) {
        const token = inject(UserService).token;

        if (token) {
            const reqWithHeader: HttpRequest<unknown> = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });

            return next(reqWithHeader);
        }
    }

    return next(req);
}