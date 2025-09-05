import { NgOptimizedImage } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
    selector: "ab-feature-item",
    templateUrl: "./feature-item.component.html",
    styleUrl: "./feature-item.component.scss",
    imports: [NgOptimizedImage]
})

export class FeatureItem {
    public title = input.required<string>();
    public content = input.required<string>();
    public icon = input.required<string>();
    public iconAlt = input.required<string>();
}