import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {
    private http = inject(HttpClient);
    private BackendURL = "http://localhost:3001/api/v1";

    login(loginForm: Object) {
        this.http.post(this.BackendURL + "/user/login", loginForm, {
            headers: {
                "Content-Type": "application/json"
            }
        }).subscribe(res => {
            console.log(res)
        });
        // handle error
    }

    logout() {

    }

    register() {

    }

    getProfile() {

    }

    putProfile() {

    }
}