import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environment/environment";

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

    logout() {
        return this.http.delete<ApiResponse>(AuthService.APIURL + "/logout",
            {
                withCredentials: true
            }
        );
    }

    register(registerForm: RegisterRequest) {
        return this.http.post<ApiResponse>(AuthService.APIURL + "/signup", registerForm);
    }

    get token(): string | null {
        return localStorage.getItem("token");
    }

    set token(token: string) {
        localStorage.setItem("token", token);
        this.isAuthenticated = true;
    }
}