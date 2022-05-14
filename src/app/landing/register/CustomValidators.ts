import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const isNumeric = new RegExp(/[0-9]$/);
const isLetter = new RegExp(/[A-Za-z]$/);
const isAlphanumeric = new RegExp(/[0-9A-Za-z]$/);

export class CustomValidators{
    public static equals(toCompare: AbstractControl): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
            return String(control.value).localeCompare(String(toCompare.value)) ? { equals: true } : null;
        }
    }

    public static rfc(moral: boolean) {
        return (control: AbstractControl): ValidationErrors | null => {       
            const length = moral ? 12 : 13;
            if(!control.value) return { RFC: true };
            if(control.value.length !== length) return { RFC: true };

            let i: number = -1;
            try{
                if(!isLetter.test(control.value.charAt(i+=1))) return { RFC: true };
                if(!isLetter.test(control.value.charAt(i+=1))) return { RFC: true };
                if(!isLetter.test(control.value.charAt(i+=1))) return { RFC: true };
                if(!moral){
                    if(!isLetter.test(control.value.charAt(i+=1))) return { RFC: true };
                }

                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };

                if(!isAlphanumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                if(!isAlphanumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                if(!isAlphanumeric.test(control.value.charAt(i+=1))) return { RFC: true };
            } catch(e){
                return { RFC: true };
            }
            return null;
        }
    }

    public static getEnterpriseCreationDate(rfc: string): Date{
        return new Date(
            Number.parseInt(rfc.slice(3, 5)),
            Number.parseInt(rfc.slice(5, 7)),
            Number.parseInt(rfc.slice(7, 9)),
          );
    }

    public static getPersonBirthDate(rfc: string): Date{
        return new Date(
            Number.parseInt(rfc.slice(4, 6)),
            Number.parseInt(rfc.slice(6, 8)),
            Number.parseInt(rfc.slice(8, 10)),
        );
    }
}
