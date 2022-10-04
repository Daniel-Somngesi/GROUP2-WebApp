import { AbstractControl } from '@angular/forms';


export class CustomInputValidators {

  static PasswordMatch(control: AbstractControl) {
    let password = control.get('Password').value;
    let confirmPassword = control.get('ConfirmPassword').value;

    if (password != confirmPassword) control.get('ConfirmPassword').setErrors({ ConfirmPassword: true });
    else {
      return null;
    }
  }

  static PasswordOptions(control: AbstractControl) {
    let password = control.get('Password').value as string;
    if (password.length > 0) {
      if (password.search(/[#?!@$%^&*-]/) == -1) control.get('Password').setErrors({ RequireNonAlphanumeric: true });
      if (password.search(/[A-Z]/) == -1) control.get('Password').setErrors({ RequireUppercase: true });
      if (password.search(/[a-z]/) == -1) control.get('Password').setErrors({ RequireLowercase: true });
      if (password.search(/[?=.*?[0-9]/) == -1) control.get('Password').setErrors({ RequireDigit: true });
      if (password.length < 8) control.get('Password').setErrors({ RequiredLength: true });
    }
    else {
      return null;
    }
  }

  static ContactNumberOptions(control: AbstractControl) {
    let contactNumber = control.get('ContactNumber').value as string;

    if (contactNumber.length > 0) {
      if (contactNumber.length != 10) control.get('ContactNumber').setErrors({ RequiredLength: true });
      if (contactNumber.match(/[A-Z]/)) control.get('ContactNumber').setErrors({ HasUppercase: true });
      if (contactNumber.match(/[a-z]/)) control.get('ContactNumber').setErrors({ HasLowercase: true });
      if (!contactNumber.match(/^[0-9]*$/)) control.get('ContactNumber').setErrors({ InvalidFormat: true });
    }
    else {
      return null;
    }
  }

  static UserName(control: AbstractControl) {
    let userName = control.get('UserName').value as string;
    if (userName.length > 0) {
      if (!userName.match(/^[A-Za-z0-9_]*$/)) control.get('UserName').setErrors({ InvalidFormat: true });
      if (userName.toLowerCase().includes("admin")) control.get('UserName').setErrors({ HasAdmin: true });
    }
    else {
      return null;
    }
  }
}

