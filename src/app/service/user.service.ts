import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../model/user";

// TODO create an interceptor for headers
@Injectable({ providedIn: "root" })
export class UserService {
    private static readonly BACKENDURL = "http://localhost:3001/api/v1/user/";
    private http = inject(HttpClient);

    private user: User | null = null;

    login(loginForm: LoginRequest) {
        return this.http.post<ApiResponse<LoginResponse>>(UserService.BACKENDURL + "login", loginForm);
    }

    logout() {
        return this.http.delete<ApiResponse>(UserService.BACKENDURL + "logout");
    }

    register(registerForm: RegisterRequest) {
        return this.http.post<ApiResponse>(UserService.BACKENDURL + "signup", registerForm);
    }

    getProfile() {
        return this.http.get<ApiResponse<GetProfileResponse>>(UserService.BACKENDURL + "profile",
            {
                withCredentials: true
            }
        );
    }

    putProfile(updateProfileForm: PutProfileRequest) {
        return this.http.put<ApiResponse<PutProfileResponse>>(UserService.BACKENDURL + "profile", updateProfileForm,
            {
                withCredentials: true
            }
        );
    }

    isAuthenticated(): boolean {
        return this.token ? true : false;
    }

    get token(): string | null {
        return localStorage.getItem("token");
    }

    setUserData(body: GetProfileResponse) {
        this.user = body;
    }

    get id(): string {
        return this.user?.id ?? "id";
    }

    get email(): string {
        return this.user?.email ?? "email";
    }

    get userName(): string {
        return this.user?.userName ?? "user name";
    }

    set userName(userName: string) {
        this.user ? this.user.userName = userName : null;
    }

    get firstName(): string {
        return this.user?.firstName ?? "Prénom";
    }

    get lastName(): string {
        return this.user?.lastName ?? "Nom";
    }
}