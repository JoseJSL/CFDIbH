import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { environment } from "src/environments/environment";

export class CustomValidators{
    public static equals(toCompare: AbstractControl): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
            return String(control.value).localeCompare(String(toCompare.value)) ? { equals: true } : null;
        }
    }

    public static rfc(aceptarGenerico = true) {
        return (control: AbstractControl): ValidationErrors | null => {
            var   validado = String(control.value).match(environment.regex.RFC);
        
            if (!validado) return null;
        
            //Separar el dígito verificador del resto del RFC
            const digitoVerificador = validado.pop(),
                  rfcSinDigito      = validado.slice(1).join(''),
                  len               = rfcSinDigito.length,
        
            //Obtener el digito esperado
                  diccionario       = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
                  indice            = len + 1;

            var   suma, digitoEsperado;
        
            suma = len == 12 ? 0 : 481;
            for(var i = 0; i < len; i++){
                suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
            }

            if (digitoEsperado == 11) {
                digitoEsperado = 0;
            } else if (digitoEsperado == 10) {
                digitoEsperado = "A";
            } 
        
            //El dígito verificador coincide con el esperado?
            // o es un RFC Genérico (ventas a público general)?
            if ((digitoVerificador != digitoEsperado) && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000")){
                return null;
            } else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000"){
                return null;
            } else {
                return { validRFC: true };
            }
        }
    }
}
