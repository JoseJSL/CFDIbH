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
            console.clear()
            if(!control.value) return { RFC: true };
            console.log('Not empty');
            if(control.value.length !== length) return { RFC: true };
            console.log('Of length ' + length);
            let i: number = -1;
            try{
                if(!isLetter.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));
                if(!isLetter.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));
                if(!isLetter.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));
                if(!moral){
                    if(!isLetter.test(control.value.charAt(i+=1))) return { RFC: true };
                    console.log(i + ': ' + control.value.charAt(i));    
                }

                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));
                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));
                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));
                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));
                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));
                if(!isNumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));

                if(!isAlphanumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));
                if(!isAlphanumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));
                if(!isAlphanumeric.test(control.value.charAt(i+=1))) return { RFC: true };
                console.log(i + ': ' + control.value.charAt(i));
            } catch(e){
                console.error(e);
                return { RFC: true };
            }
            console.log('IS VALID');
            return null;
        }
    }
}
