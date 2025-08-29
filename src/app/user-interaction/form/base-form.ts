import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "ab-base-form",
    templateUrl: "./base-form.html"
})
export abstract class BaseForm {
    protected formGrp!: FormGroup;
    protected error: string = "";
    protected isLoading: boolean = false;

    ngOnInit() {
        this.formGrp = this.buildForm();
    }

    handleSubmit() {
        this.error = "";

        if (this.isFieldsValid()) {
            this.isLoading = true;
            this.onSubmit();
        }
    }

    // TODO give a type to the param
    protected handleErrorResponse(err: any) {
        if (err.status === 400) {
            this.error = "Champ invalide";
        }
        if (err.status === 401) {
            this.error = "Identifiant invalide";
        }
        if (err.status === 409) {
            this.error = "Email déjà utilisé";
        }
        if (err.status === 500) {
            this.error = "Erreur serveur";
        }

        this.isLoading = false;
    }

    protected abstract buildForm(): FormGroup;

    protected abstract onSubmit(): void;

    protected abstract isFieldsValid(): boolean;
}