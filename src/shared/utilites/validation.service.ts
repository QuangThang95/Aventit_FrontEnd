import {
  Injectable
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
@Injectable()
export class ValidationService {

  constructor() { }

  /**
   * Validates email address
   *
   * @param formControl
   */
  public validateEmail(formControl: FormControl): { [error: string]: any } {
    const REGEXP1 = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)';
    const REGEXP2 = '(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])';
    const REGEXP3 = '(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    const EMAIL_REGEXP = new RegExp(`${REGEXP1}|${REGEXP2}|${REGEXP3}`);
    return EMAIL_REGEXP.test(formControl.value) ? null : { validateEmail: { valid: false } };
  }

  /**
   * Validates required numeric values
   *
   * @param formControl
   */
  public numericRequired(formControl: FormControl): { [error: string]: any } {
    return (formControl.value && formControl.value > 0) ? null : { numericRequired: { valid: false } };
  }

  /**
   * Validates matching string values
   *
   * @param controlKey
   * @param matchingControlKey
   */
  public matchingPasswords(controlKey: string, matchingControlKey: string): { [error: string]: any } {
    return (group: FormGroup): { [key: string]: any } => {
      if (group.controls[controlKey].value !== group.controls[matchingControlKey].value) {
        return { mismatch: { valid: false } };
      }
    };
  }
}
