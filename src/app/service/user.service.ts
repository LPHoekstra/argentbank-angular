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
                headers: {
                    "Authorization": this.isAuthenticated() ?
                        "Bearer " + this.token as string : ""
                }
            }
        );
    }

    putProfile(updateProfileForm: PutProfileRequest) {
        return this.http.put<ApiResponse<PutProfileResponse>>(UserService.BACKENDURL + "profile", updateProfileForm,
            {
                headers: {
                    "Authorization": this.isAuthenticated() ?
                        "Bearer " + this.token as string : ""
                }
            }
        );
    }

    public isAuthenticated(): boolean {
        return this.token ? true : false;
    }

    get token(): string | null {
        return localStorage.getItem("token");
    }

    public setUserData(body: GetProfileResponse) {
        this.user = body;
    }

    public get id(): string {
        return this.user?.id ?? "id";
    }

    public get email(): string {
        return this.user?.email ?? "email";
    }

    public get userName(): string {
        return this.user?.userName ?? "user name";
    }

    public set userName(userName: string) {
        this.user ? this.user.userName = userName : null;
    }

    public get firstName(): string {
        return this.user?.firstName ?? "Prénom";
    }

    public get lastName(): string {
        return this.user?.lastName ?? "Nom";
    }
}