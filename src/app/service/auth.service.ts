import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { catchError, tap, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
    private static readonly APIURL = `${environment.apiUrl}/user`;
    http = inject(HttpClient);

    public isAuthenticated: boolean = false;

    constructor() {
        if (this.token) {
            this.isAuthenticated = true;
        }
    }

    login(loginForm: LoginRequest) {
        return this.http.post<ApiResponse<LoginResponse>>(AuthService.APIURL + "/login", loginForm);
    }

    /**
     * Logout the user by invalidate the token in the API and by clearing the session.
     * If an error occur with the API the session is clear anyway.
     * @returns 
     */
    logout() {
        return this.http.delete<ApiResponse>(AuthService.APIURL + "/logout",
            {
                withCredentials: true
            }
        ).pipe(
            tap(() => this.clearSession()),
            catchError((err) => {
                this.clearSession();
                return throwError(() => err);
            })
        );
    }

    register(registerForm: RegisterRequest) {
        return this.http.post<ApiResponse>(AuthService.APIURL + "/signup", registerForm);
    }

    clearSession() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.isAuthenticated = false;
    }

    get token(): string | null {
        return localStorage.getItem("token");
    }

    set token(token: string) {
        localStorage.setItem("token", token);
        this.isAuthenticated = true;
    }
}