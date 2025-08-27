import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {
    private static readonly BACKENDURL = "http://localhost:3001/api/v1/user/";
    private http = inject(HttpClient);

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
        return this.http.get<ApiResponse<GetProfileResponse>>(UserService.BACKENDURL + "profile");
    }

    putProfile(updateProfileForm: UpdateProfileRequest) {
        return this.http.put<ApiResponse<PutProfileResponse>>(UserService.BACKENDURL + "profile", updateProfileForm);
    }
}