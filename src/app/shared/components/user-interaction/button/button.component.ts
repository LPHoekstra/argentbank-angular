import { Component, input } from "@angular/core";
import { Loader } from "../../loader/loader.component";

@Component({
    selector: "ab-button",
    templateUrl: "./button.component.html",
    styleUrl: "./button.component.scss",
    imports: [Loader]
})

// TODO can add aditionnal class in input
export class Button {
    public text = input.required<string>();
    public type = input<butttonType>("submit");
    public isLoading = input<boolean>(false);
}

type butttonType = "submit" | "button" | "reset";