import { Component } from "@angular/core";
import { FeatureItem } from "./feature-item/feature-item.component";

@Component({
    selector: "ab-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    imports: [FeatureItem]
})
export class Home {
    protected features = [
        {
            title: "You are our #1 priority",
            icon: "/assets/icon-chat-opti.png",
            iconAlt: "Chat",
            content: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        },
        {
            title: "More savings means higher rates",
            icon: "/assets/icon-money-opti.png",
            iconAlt: "Money",
            content: "The more you save with us, the higher your interest rate will be!"
        },
        {
            title: "Security you can trust",
            icon: "/assets/icon-security-opti.png",
            iconAlt: "Security",
            content: "We use top of the line encryption to make sure your data and money is always safe."
        },
    ];
}