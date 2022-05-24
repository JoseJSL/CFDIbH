export class Ingreso implements CFDIIngreso {
    public Impuestos: Impuesto[];
    public Emisor: Emisor;
    public Receptor: Receptor;
    public Conceptos: Concepto[];
    public _Certificado: string;
    public _Exportacion: string;
    public _Fecha: Date;
    public _Folio: string;
    public _LugarExpedicion: string;
    public _Moneda: string;
    public _NoCertificado: string;
    public _Sello: string;
    public _Serie: string;
    public _SubTotal: number;
    public _TipoDeComprobante: "I" | "E" | "T" | "P" | "N";
    public _Total: number;
    public _Version: string;
    public _FormaPago: string | undefined;
    public _MetodoPago: string | undefined;

    constructor(originalData: any){
        const data = asIncome(originalData);

        this.Conceptos = data.Conceptos;
        this.Emisor = getEmisor(data.Emisor);
        this.Impuestos = data.Impuestos;
        this.Receptor = getReceptor(data.Receptor);
        this._Certificado = data._Certificado;
        this._Exportacion = data._Exportacion;
        this._Fecha = data._Fecha;
        this._Folio = data._Folio;
        this._LugarExpedicion = data._LugarExpedicion;
        this._Moneda = data._Moneda;
        this._NoCertificado = data._NoCertificado;
        this._Sello = data._Sello;
        this._Serie = data._Serie;
        this._SubTotal = data._SubTotal;
        this._TipoDeComprobante = data._TipoDeComprobante;
        this._Total = data._Total;
        this._Version = data._Version;
        this._FormaPago = data._FormaPago;
        this._MetodoPago = data._MetodoPago;
    }
}

export class Egreso implements CFDIEgreso {
    public CfdiRelacionados: CfdiRelacionados;
    public Impuestos: Impuesto[];
    public Emisor: Emisor;
    public Receptor: Receptor;
    public Conceptos: Concepto[];
    public _Certificado: string;
    public _Exportacion: string;
    public _Fecha: Date;
    public _Folio: string;
    public _LugarExpedicion: string;
    public _Moneda: string;
    public _NoCertificado: string;
    public _Sello: string;
    public _Serie: string;
    public _SubTotal: number;
    public _TipoDeComprobante: "I" | "E" | "T" | "P" | "N";
    public _Total: number;
    public _Version: string;
    public _FormaPago: string | undefined;
    public _MetodoPago: string | undefined;

    constructor(originalData: any){
        const data = asExpenditure(originalData);

        this.CfdiRelacionados = data.CfdiRelacionados;
        this.Conceptos = data.Conceptos;
        this.Emisor = getEmisor(data.Emisor);
        this.Impuestos = data.Impuestos;
        this.Receptor = getReceptor(data.Receptor);
        this._Certificado = data._Certificado;
        this._Exportacion = data._Exportacion;
        this._Fecha = data._Fecha;
        this._Folio = data._Folio;
        this._LugarExpedicion = data._LugarExpedicion;
        this._Moneda = data._Moneda;
        this._NoCertificado = data._NoCertificado;
        this._Sello = data._Sello;
        this._Serie = data._Serie;
        this._SubTotal = - data._SubTotal;
        this._TipoDeComprobante = data._TipoDeComprobante;
        this._Total = - data._Total;
        this._Version = data._Version;
        this._FormaPago = data._FormaPago;
        this._MetodoPago = data._MetodoPago
    }
}

export class Traslado implements CFDITraslado {
    public Complemento: Complemento;
    public Emisor: Emisor;
    public Receptor: Receptor;
    public Conceptos: Concepto[];
    public _Certificado: string;
    public _Exportacion: string;
    public _Fecha: Date;
    public _Folio: string;
    public _LugarExpedicion: string;
    public _Moneda: string;
    public _NoCertificado: string;
    public _Sello: string;
    public _Serie: string;
    public _SubTotal: number;
    public _TipoDeComprobante: "I" | "E" | "T" | "P" | "N";
    public _Total: number;
    public _Version: string;
    public _FormaPago: string | undefined;
    public _MetodoPago: string | undefined;

    constructor(originalData: any){
        const data = asTransfer(originalData);

        this.Complemento = {
            TimbreFiscalDigital: {
                _FechaTimbrado: data.Complemento.TimbreFiscalDigital._FechaTimbrado,
                _NoCertificadoSAT: data.Complemento.TimbreFiscalDigital._NoCertificadoSAT,
                _RfcProvCertif: data.Complemento.TimbreFiscalDigital._RfcProvCertif,
                _SelloCFD: data.Complemento.TimbreFiscalDigital._SelloCFD,
                _SelloSAT: data.Complemento.TimbreFiscalDigital._SelloSAT,
                _UUID: data.Complemento.TimbreFiscalDigital._UUID,
            }
        };
        
        this.Conceptos = data.Conceptos;
        this.Emisor = getEmisor(data.Emisor);
        this.Receptor = getReceptor(data.Receptor);
        this._Certificado = data._Certificado;
        this._Exportacion = data._Exportacion;
        this._Fecha = data._Fecha;
        this._Folio = data._Folio;
        this._LugarExpedicion = data._LugarExpedicion;
        this._Moneda = data._Moneda;
        this._NoCertificado = data._NoCertificado;
        this._Sello = data._Sello;
        this._Serie = data._Serie;
        this._SubTotal = data._SubTotal;
        this._TipoDeComprobante = data._TipoDeComprobante;
        this._Total = data._Total;
        this._Version = data._Version;
        this._FormaPago = data._FormaPago;
        this._MetodoPago = data._MetodoPago;
    }
}

interface CFDIIngreso extends CFDI{
    Impuestos: Impuesto[],
}

interface CFDIEgreso extends CFDI {
    CfdiRelacionados: CfdiRelacionados,
    Impuestos: Impuesto[],
}

interface CFDITraslado extends CFDI {
    Complemento: Complemento,
}

interface CFDI {
    Emisor: Emisor,
    Receptor: Receptor,
    Conceptos: Concepto[],

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
    _TipoDeComprobante: "I" | "E" | "T" | "P" | "N",
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

interface Impuesto {
    Traslados: Translado[];
    _TotalImpuestosTrasladados?: number,
}

interface Translado {
    _Base: string,
    _Importe: string,
    _TipoFactor: string,
    _Impuesto: string,
    _TasaOCuota: string,
}

interface CfdiRelacionados {
    CfdiRelacionado: { UID : string}[];
    _TipoRelacion: string,
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

export class ReadableCFDI {
    Receptor: string;
    Emisor: string;
    Fecha: string;
    FormaPago: 'Efectivo' | 'Cheque nominativo' | 'Transferencia electrónica de fondos' | 'Tarjeta de crédito' | 'Por definir' | 'N/A';
    MetodoPago: 'En una sola exhibición' | 'En parcialidades o diferido' | 'N/A';
    LugarExpedicion: string;
    Subtotal: string;
    Total: string;
    Impuestos: string;
    TipoComprobante: 'Ingreso' | 'Egreso' | 'Traslado';

    constructor(data: any){
        this.Receptor = data.Receptor._Nombre;
        this.Emisor = data.Emisor._Nombre;
        this.Fecha = this.getReadableDate(new Date(data._Fecha));

        if(data._FormaPago){
            this.FormaPago = 
                data._FormaPago == '01' ? 'Efectivo' : 
                data._FormaPago == '02' ? 'Cheque nominativo' : 
                data._FormaPago == '03' ? 'Transferencia electrónica de fondos' : 
                data.formaPago == '04' ? 'Tarjeta de crédito' : 'Por definir';
        } else {
            this.FormaPago = 'N/A';
        }

        if(data._MetodoPago){
            this.MetodoPago = data._MetodoPago == 'PUE' ? 'En una sola exhibición' : 'En parcialidades o diferido';
        } else {
            this.MetodoPago = 'N/A';
        }

        this.LugarExpedicion = data._LugarExpedicion;
        this.Subtotal = parseFloat(data._SubTotal).toFixed(2);
        this.Total = parseFloat(data._Total).toFixed(2);
        this.Impuestos = parseFloat(Math.abs(data._Total - data._SubTotal).toString()).toFixed(2);

        this.TipoComprobante = data._TipoDeComprobante == 'I' ? 'Ingreso' : 
            data._TipoDeComprobante == 'E' ? 'Egreso' : 'Traslado'; 
    }

    private getReadableDate(date: Date) : string{
        let readableDate: string = date.getDay().toString().padStart(2, '0') + '/';

        switch(date.getMonth()){
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

function asIncome(data: any): CFDIIngreso {   
    if(data.Impuestos){
        if(!data.Impuestos[0]){
            data.Impuestos = [ data.Impuestos, ];
        }

        for(let i = 0; i < data.Impuestos.length; i++){
            if(data.Impuestos[i].Traslados){
                if(!data.Impuestos[i].Traslados[0]){
                    data.Impuestos[i].Traslados = [ data.Impuestos[i].Traslados.Traslado ]
                }
            }
        }
    }

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
    }

    data._SubTotal = Number.parseFloat(data._SubTotal);
    data._Fecha = new Date(data._Fecha);

    return data;
}

function asExpenditure(data: any): CFDIEgreso {
    if(data.Impuestos){
        if(!data.Impuestos[0]){
            data.Impuestos = [ data.Impuestos, ];
        }

        for(let i = 0; i < data.Impuestos.length; i++){
            if(data.Impuestos[i]){
                if(!data.Impuestos[i].Traslados[0]){
                    data.Impuestos[i].Traslados = [ data.Impuestos[i].Traslados.Traslado ]
                }   
            }
        }
    }
    
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
    }

    if(data.CfdiRelacionados){
        if(data.CfdiRelacionados.CfdiRelacionado){
            if(!data.CfdiRelacionados.CfdiRelacionado[0]){
                data.CfdiRelacionados.CfdiRelacionado = [ data.CfdiRelacionados.CfdiRelacionado, ];
            } 
        }
    }

    data._SubTotal = Number.parseFloat(data._SubTotal);
    data._Fecha = new Date(data._Fecha);

    return data;
}

function asTransfer(data: any): CFDITraslado {
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
    }

    data._Fecha = new Date(data._Fecha);
    data._SubTotal = Number.parseFloat(data._SubTotal);
    data.Complemento.TimbreFiscalDigital._FechaTimbrado = new Date(data.Complemento.TimbreFiscalDigital._FechaTimbrado);

    return data;
}


function getReceptor(data: Receptor): Receptor{
    return {
        _DomicilioFiscalReceptor: data._DomicilioFiscalReceptor,
        _Nombre: data._Nombre ? data._Nombre : 'S/R',
        _RegimenFiscalReceptor: data._RegimenFiscalReceptor,
        _Rfc: data._Rfc,
        _UsoCFDI: data._UsoCFDI,
    }
}

function getEmisor(data: Emisor): Emisor{
    return {
        _Nombre: data._Nombre ? data._Nombre : 'S/E',
        _RegimenFiscal: data._RegimenFiscal,
        _Rfc: data._Rfc,
    }
}