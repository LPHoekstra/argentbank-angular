import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environment/environment";

@Injectable({ providedIn: "root" })
export class AuthService {
    private static readonly APIURL = `${environment.apiUrl}/user`;
    http = inject(HttpClient);

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

    isAuthenticated(): boolean {
        return this.token ? true : false;
    }

    get token(): string | null {
        return localStorage.getItem("token");
    }
}