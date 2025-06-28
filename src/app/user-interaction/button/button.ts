import { Component, input } from "@angular/core";

@Component({
    selector: "ab-button",
    templateUrl: "./button.html",
    styleUrl: "./button.scss"
})

export class Button {
    public text = input.required<string>();
    public type = input<butttonType>("submit");
    // can passed aditionnal class in input

    onClick() {
    }

}

type butttonType = "submit" | "button" | "reset";