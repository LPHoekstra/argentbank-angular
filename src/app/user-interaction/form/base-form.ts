import { HttpErrorResponse } from "@angular/common/http";
import { Directive } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Directive()
export abstract class BaseForm {
    protected formGrp!: FormGroup;
    protected error: string = "";
    protected isLoading: boolean = false;

    ngOnInit() {
        this.formGrp = this.buildForm();
    }

    onSubmit() {
        this.error = "";

        if (this.isFieldsValid()) {
            this.isLoading = true;
            this.handleSubmit();
        }
    }

    protected handleErrorResponse(err: HttpErrorResponse) {
        this.error = "Erreur lors de la requête";

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

    protected abstract handleSubmit(): void;

    protected abstract isFieldsValid(): boolean;
}