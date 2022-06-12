type TipoComprobante = "I" | "E" | "T" | "P" | "N";

export class CFDI implements BaseCFDI{
    public Emisor: Emisor;
    public Impuestos: Impuesto[];
    public Receptor: Receptor;
    public Conceptos: Concepto[];
    public Complemento: Complemento | undefined;
    public _Certificado: string;
    public _Exportacion: string;
    public _FormaPago: string | undefined;
    public _MetodoPago: string | undefined;
    public _Fecha: Date;
    public _Folio: string;
    public _LugarExpedicion: string;
    public _Moneda: string;
    public _NoCertificado: string;
    public _Sello: string;
    public _Serie: string;
    public _SubTotal: number;
    public _TipoDeComprobante: TipoComprobante;
    public _Total: number;
    public _Version: string;

    constructor(data: any){
        this.Emisor = {
            _Nombre: data.Emisor._Nombre ? data.Emisor._Nombre : 'S/E',
            _RegimenFiscal: data.Emisor._RegimenFiscal,
            _Rfc: data.Emisor._Rfc,
        };

        if(data.Impuestos){
            if(!data.Impuestos[0]){
                data.Impuestos = [ data.Impuestos, ];
            }
    
            for(let i = 0; i < data.Impuestos.length; i++){
                if(data.Impuestos[i].Traslados){
                    if(!data.Impuestos[i].Traslados[0]){
                        data.Impuestos[i].Traslados = [ data.Impuestos[i].Traslados.Traslado ]
                    }

                    for(let j = 0; j < data.Impuestos[i].Traslados.length; j++){
                        data.Impuestos[i].Traslados[j] = {
                            _Base: parseFloat(data.Impuestos[i].Traslados[j]._Base),
                            _Importe: parseFloat(data.Impuestos[i].Traslados[j]._Importe),
                            _Impuesto: parseFloat(data.Impuestos[i].Traslados[j]._Impuesto),
                            _TasaOCuota: parseFloat(data.Impuestos[i].Traslados[j]._TasaOCuota),
                            _TipoFactor: data.Impuestos[i].Traslados[j]._TipoFactor,
                        }
                    }
                } else {
                    data.Impuestos.Traslados = [];
                }

                data.Impuestos[i]._TotalImpuestosTrasladados = parseFloat(data.Impuestos[i]._TotalImpuestosTrasladados);
            }

            this.Impuestos = data.Impuestos;
        } else {
            this.Impuestos = [];
        }

        this.Receptor = {
            _DomicilioFiscalReceptor: data.Receptor._DomicilioFiscalReceptor,
            _Nombre: data.Receptor._Nombre ? data.Receptor._Nombre : 'S/R',
            _RegimenFiscalReceptor: data.Receptor._RegimenFiscalReceptor,
            _Rfc: data.Receptor._Rfc,
            _UsoCFDI: data.Receptor._UsoCFDI,
        };

        if(data.Conceptos){
            if(!data.Conceptos[0]){
                if(!data.Conceptos.Concepto.length){
                    data.Conceptos = [ data.Conceptos.Concepto ];
                } else {
                    const tmp = data.Conceptos.Concepto;
                    data.Conceptos = [];
                    for(let i = 0; i < tmp.length; i++){
                        data.Conceptos.push(tmp[i]);
                    }
                }
            }

            this.Conceptos = data.Conceptos;
        } else {
            this.Conceptos = [];
        }

     
        if(data.Complemento){
            this.Complemento = {
                TimbreFiscalDigital: {
                    _FechaTimbrado: new Date(data.Complemento.TimbreFiscalDigital._FechaTimbrado),
                    _NoCertificadoSAT: data.Complemento.TimbreFiscalDigital._NoCertificadoSAT,
                    _RfcProvCertif: data.Complemento.TimbreFiscalDigital._RfcProvCertif,
                    _SelloCFD: data.Complemento.TimbreFiscalDigital._SelloCFD,
                    _SelloSAT: data.Complemento.TimbreFiscalDigital._SelloSAT,
                    _UUID: data.Complemento.TimbreFiscalDigital._UUID,
                }
            };   
        }

        this._Certificado = data._Certificado;
        this._Exportacion = data._Exportacion;
        this._FormaPago = data._FormaPago;
        this._MetodoPago = data._MetodoPago;
        this._Fecha = new Date(data._Fecha);
        this._Folio = data._Folio;
        this._LugarExpedicion = data._LugarExpedicion;
        this._Moneda = data._Moneda;
        this._NoCertificado = data._NoCertificado;
        this._Sello = data._Sello;
        this._Serie = data._Serie;
        this._SubTotal = parseFloat(data._SubTotal);
        this._TipoDeComprobante = data._TipoDeComprobante;
        this._Total = parseFloat(data._Total);
        this._Version = data._Version;

        this._SubTotal = Number.parseFloat(data._SubTotal);
        this._Total = Number.parseFloat(data._Total);
        this._Fecha = new Date(data._Fecha);
    }

    private tryConvertFromObjectToArray(data: any): any[]{
        if(!Array.isArray(data)){
            return [ data ];
        } else {
            return data;
        }
    }
}

interface BaseCFDI{
    Emisor: Emisor,
    Impuestos: Impuesto[],
    Receptor: Receptor,
    Conceptos: Concepto[],
    Complemento: Complemento | undefined,

    _Certificado: string,
    _Exportacion: string,
    _FormaPago: string | undefined,
    _MetodoPago: string | undefined,
    _Fecha: Date,
    _Folio: string,
    _LugarExpedicion: string,
    _Moneda: string,
    _NoCertificado: string,
    _Sello: string,
    _Serie: string,
    _SubTotal: number
    _TipoDeComprobante: TipoComprobante,
    _Total: number,
    _Version: string,
}

interface Emisor {
    _Nombre: string,
    _RegimenFiscal: string,
    _Rfc: string,
}

interface Receptor {
    _DomicilioFiscalReceptor: string,
    _Nombre: string,
    _RegimenFiscalReceptor: string,
    _Rfc: string,
    _UsoCFDI: "G01" | "G02" | "G03" | "I01" | "I02" | "I03" | "I04" | "I05" | "I06" | "IO7" |"I08" | "D01" | "D02" | "D03" | "D04" | "D05" | "D06" | "D07" | "D08" | "D09" | "D10" | "P01",
}

interface Concepto {
    Impuestos: Impuesto[],
    _Cantidad: number,
    _ClaveProdServ: string,
    _ClaveUnidad: string,
    _Descripcion: string,
    _Importe: number,
    _NoIdentificacion: string,
    _ObjetoImp: string,
    _Unidad: string,
    _ValorUnitario: string,
}

interface Complemento {
    TimbreFiscalDigital: {
        _FechaTimbrado: Date;
        _NoCertificadoSAT: string,
        _RfcProvCertif: string,
        _SelloCFD: string,
        _SelloSAT: string,
        _UUID: string,
    }
}

interface Impuesto {
    Traslados: Traslado[];
    _TotalImpuestosTrasladados?: number,
}

interface Traslado {
    _Base: number,
    _Importe: number,
    _TipoFactor: string,
    _Impuesto: number,
    _TasaOCuota: number,
}

export class ReadableCFDI {
    Receptor: string;
    Emisor: string;
    Fecha: string;
    FechaTimbrado?: string;
    FormaPago: string;
    MetodoPago: 'En una sola exhibición' | 'En parcialidades o diferido' | 'N/A';
    LugarExpedicion: string;
    Subtotal: string;
    Total: string;
    Impuestos: string;
    TipoComprobante: 'Ingreso' | 'Egreso' | 'Traslado' | 'Pago' | 'Nomina';

    constructor(data: CFDI){
        this.Receptor = data.Receptor._Nombre;
        this.Emisor = data.Emisor._Nombre;
        this.Fecha = this.getReadableDate(data._Fecha);

        if(data.Complemento){
            this.FechaTimbrado = this.getReadableDate(data.Complemento.TimbreFiscalDigital._FechaTimbrado);
        }

        if(data._FormaPago){
            this.FormaPago = getFormaDePago(data._FormaPago)
        } else {
            this.FormaPago = 'N/A';
        }

        if(data._MetodoPago){
            this.MetodoPago = data._MetodoPago == 'PUE' ? 'En una sola exhibición' : 'En parcialidades o diferido';
        } else {
            this.MetodoPago = 'N/A';
        }

        this.LugarExpedicion = data._LugarExpedicion;
        this.Subtotal = data._SubTotal.toFixed(2);
        this.Total = data._Total.toFixed(2);
        this.Impuestos = (data._Total - data._SubTotal).toFixed(2);

        switch(data._TipoDeComprobante){
            case('I'):
                this.TipoComprobante = 'Ingreso';
                break;
            case('E'):
                this.TipoComprobante = 'Egreso';
                break;
            case('T'):
                this.TipoComprobante = 'Traslado';
                break;
            case('P'):
                this.TipoComprobante = 'Pago';
                break;         
            default:
                this.TipoComprobante = 'Nomina';
                break;             
        };
    }

    private getReadableDate(date: Date) : string{
        let readableDate: string = date.getDay().toString().padStart(2, '0') + '/';
        const m = date.getMonth();
        
        switch(m){
          case 0: readableDate += 'Enero'; break;
          case 1: readableDate += 'Febrero'; break;
          case 2: readableDate += 'Marzo'; break;
          case 3: readableDate += 'Abril'; break;
          case 4: readableDate += 'Mayo'; break;
          case 5: readableDate += 'Junio'; break;
          case 6: readableDate += 'Julio'; break;
          case 7: readableDate += 'Agosto'; break;
          case 8: readableDate += 'Septiembre'; break;
          case 9: readableDate += 'Octubre'; break;
          case 10: readableDate += 'Noviembre'; break;
          case 11: readableDate += 'Diciembre'; break;
          default: readableDate += 'Diciembre';
        }

        return readableDate + '/' + date.getFullYear();
    }
}

const formasDePago: {[key:string]: string} = {
    ['01']: 'Efectivo',
    ['02']: 'Cheque nominativo',
    ['03']: 'Transferencia electrónica de fondos',
    ['04']: 'Tarjeta de crédito',
    ['05']: 'Monedero electrónico',
    ['06']: 'Dinero electrónico',
    ['08']: 'Vales de despensa',
    ['12']: 'Dación en pago',
    ['13']: 'Pago por subrogación',
    ['14']: 'Condonación',
    ['15']: 'Condonación',
    ['17']: 'Compensación',
    ['23']: 'Novación',
    ['24']: 'Confusión',
    ['25']: 'Remisión de deuda',
    ['26']: 'Prescripción o caducidad',
    ['27']: 'A satisfacción del acreedor',
    ['28']: 'Tarjeta de débito',
    ['29']: 'Tarjeta de servicios',
    ['30']: 'Aplicación de anticipos',
    ['99']: 'Por definir',
};

export function getFormaDePago(formaPago: string): string{
    return formasDePago[formaPago] ? formasDePago[formaPago] : formaPago;
}
