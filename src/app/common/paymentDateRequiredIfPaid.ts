import { AbstractControl, ValidatorFn } from '@angular/forms';

export function paymentDateRequiredIfPaid(): ValidatorFn {
  return (group: AbstractControl): { [key: string]: any } | null => {
    const status = group.get('status')?.value;
    const paymentDate = group.get('payment_date')?.value;

    if (status === 'paid' && !paymentDate) {
      group.get('payment_date')?.setErrors({ requiredIfPaid: true });
      return { requiredIfPaid: true };
    } else {
      const control = group.get('payment_date');
      if (control?.hasError('requiredIfPaid')) {
        control.updateValueAndValidity({ onlySelf: true });
      }
    }

    return null;
  };
}
