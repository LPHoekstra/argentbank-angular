import { Component, input } from "@angular/core";

@Component({
    selector: "ab-bank-account-preview",
    templateUrl: "./bank-account-preview.html",
    styleUrl: "./bank-account-preview.scss",
})
export class BankAccountPreview {
    title = input.required<string>();
    amount = input.required<string>();
    description = input.required<string>();
}