import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../model/user";
import { environment } from "../../environment/environment";

@Injectable({ providedIn: "root" })
export class UserService {
    private static readonly APIURL = `${environment.apiUrl}/user`;
    private http = inject(HttpClient);

    private user: User | null = null;

    ngOnInit() {
        const localUser: User | null = this.getLocalUser();
        if (localUser) {
            this.user = localUser;
        }
    }

    getProfile() {
        return this.http.get<ApiResponse<GetProfileResponse>>(UserService.APIURL + "/profile",
            {
                withCredentials: true
            }
        );
    }

    putProfile(updateProfileForm: PutProfileRequest) {
        return this.http.put<ApiResponse<PutProfileResponse>>(UserService.APIURL + "/profile", updateProfileForm,
            {
                withCredentials: true
            }
        );
    }

    private getLocalUser(): User | null {
        const jsonUser = localStorage.getItem("user");

        if (jsonUser) {
            return JSON.parse(jsonUser);
        }

        return null;
    }

    private setLocalUser(user: User) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    setUser(user: User) {
        this.user = user;
        this.setLocalUser(user);
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

    /**
     * The user must be initialized when this called, otherwise it do nothing
     */
    set userName(userName: string) {
        if (this.user) {
            this.user.userName = userName;
            this.setLocalUser(this.user);
        }
    }

    get firstName(): string {
        return this.user?.firstName ?? "Prénom";
    }

    get lastName(): string {
        return this.user?.lastName ?? "Nom";
    }
}