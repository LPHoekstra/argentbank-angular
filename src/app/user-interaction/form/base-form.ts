import { FormGroup } from "@angular/forms";

export abstract class BaseForm {
    protected formGrp!: FormGroup;
    protected error: string = "";
    protected isLoading: boolean = false;

    handleSubmit() {

    }

    protected abstract onSubmit(): void;

    protected abstract isFieldsValid(): boolean;
}