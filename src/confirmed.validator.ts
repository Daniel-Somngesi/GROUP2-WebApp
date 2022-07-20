import { FormGroup } from '@angular/forms';

export function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
export function ExpiryDateValidator(controlName: any, ValidationDate: any){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = ValidationDate;
        if (control.errors && !control.errors.expiryDateValidator) {
            return;
        }
        if (control.value.replace('/','') < matchingControl) {
            control.setErrors({ expiryDateValidator: true });
        } else {
            control.setErrors(null);
        }
    }
}
