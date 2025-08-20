import { Component, input, output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "ab-input-label",
    templateUrl: "./input-label.html",
    styleUrl: "./input-label.scss",
    imports: [FormsModule]
})

export class InputLabel {
    protected labelText: string = "";
    protected inputType: string = "";
    protected inputId: string = "";
    protected inputAutoComplete: string = "";

    protected inputValue = "";
    inputValueEvent = output<string>();

    public type = input.required<types>()
    public disabled = input<boolean>(false)
    public placeholder = input<string>("")

    ngOnInit() {
        this.setInputs(inputs[this.type()]);
    }

    onChange() {
        this.inputValueEvent.emit(this.inputValue);
    }

    setInputs(inputs: inputs) {
        this.labelText = inputs.label;
        this.inputType = inputs.type;
        this.inputId = inputs.id;
        this.inputAutoComplete = inputs.autoComplete;
    }
}

type types = "email" | "password" | "username" | "firstname" | "lastname";

interface inputs {
    label: string,
    type: string,
    autoComplete: string,
    id: string
}

const inputs = {
    email: {
        label: "Email",
        type: "email",
        autoComplete: "email",
        id: "email"
    },
    password: {
        label: "Password",
        type: "password",
        autoComplete: "current-password",
        id: "password"
    },
    username: {
        label: "User name",
        type: "username",
        autoComplete: "username",
        id: "userName"
    },
    firstname: {
        label: "First name",
        type: "firstname",
        autoComplete: "given-name",
        id: "firstName"
    },
    lastname: {
        label: "Last name",
        type: "lastname",
        autoComplete: "family-name",
        id: "lastName"
    }
}