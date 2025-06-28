import { Component } from "@angular/core";
import { InputLabel } from "../../user-interaction/form/input-label/input-label";
import { Button } from "../../user-interaction/button/button";

@Component({
    selector: "ab-login",
    templateUrl: "./login.html",
    styleUrl: "./login.scss",
    imports: [InputLabel, Button]
})

export class Login {

}