import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const regexpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

/**
 * Verify if the password as a minimum length of 8 characters and contains 
 * at least one capital and a lowercase letter.
 * @returns null if the password is correct otherwise a ValidationErrors object 
 * with "password" property.
 */
export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (typeof control.value === "string") {
            const stringValue = control.value as string;

            if (!regexpPassword.test(stringValue)) {
                let returnedMsg = "";

                if (stringValue.length < 8) {
                    returnedMsg = "Le mot de passe doit contenir au moins 8 caractères.";
                } else {
                    returnedMsg = "Le mot de passe doit contenir au moins une majuscule, minuscule et un chiffre.";
                }

                return { password: returnedMsg };
            }
        }

        return null;
    }
}