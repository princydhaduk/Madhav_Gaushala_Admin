import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const atLeastOneOfferRequiredValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const offercount = group.get('offercount')?.value;
  const offerpercentage = group.get('offerpercentage')?.value;
  const roomorfacilityid = group.get('roomorfacilityid')?.value;
  const describe = group.get('describe')?.value;

  const anyFieldFilled =
    offercount || offerpercentage || roomorfacilityid || describe;

  if (!anyFieldFilled) {
    return null;
  }

  if (offercount || offerpercentage) {
    return null;
  }

  return { atLeastOneRequired: true };
};
