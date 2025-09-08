import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {
    private static readonly BACKENDURL = "http://localhost:3001/api/v1/user/";
    private http = inject(HttpClient);

    public id: string | null = null;
    public email: string | null = null;
    public userName: string | null = null;
    public firstName: string | null = null;
    public lastName: string | null = null;

    public setUserData(body: GetProfileResponse) {
        this.id = body.id;
        this.email = body.email;
        this.userName = body.userName;
        this.firstName = body.firstName;
        this.lastName = body.lastName;
    }

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

    putProfile(updateProfileForm: UpdateProfileRequest) {
        return this.http.put<ApiResponse<PutProfileResponse>>(UserService.BACKENDURL + "profile", updateProfileForm);
    }

    public isAuthenticated(): boolean {
        return this.token ? true : false;
    }

    get token(): string | null {
        return localStorage.getItem("token");
    }
}