export class Ingreso implements CFDIIngreso {
    Complemento: Complemento
    Conceptos: Concepto[]
    Emisor: Emisor
    Impuestos: Impuesto[]
    Receptor: Receptor
    _Certificado: string
    _Exportacion: string
    _Fecha: Date
    _Folio: string
    _FormaPago: string
    _LugarExpedicion: string
    _MetodoPago: string
    _Moneda: string
    _NoCertificado: string
    _Sello: string
    _Serie: string
    _SubTotal: number
    _TipoCambio: string
    _TipoDeComprobante: "I" | "E" | "T"
    _Total: number
    _Version: string

    constructor(rawData: any){
        let tmp: any = rawData.Complemento.TimbreFiscalDigital;

        this.Complemento = {
            TimbreFiscalDigital: {
                _FechaTimbrado: new Date(tmp._FechaTimbrado),
                _NoCertificadoSAT: tmp._NoCertificadoSAT,
                _RfcProvCertif: tmp._RfcProvCertif,
                _SelloCFD: tmp._SelloCFD,
                _SelloSAT: tmp._SelloSAT,
                _UUID: tmp._UUID,
                _Version: tmp._Version,
            }
        }

        this.Conceptos = [];
        rawData.Conceptos.forEach((c: any) => {
            this.Conceptos.push({
                Impuesto: {
                    Traslados: {
                        Traslado: c.Impuesto.Traslados.Traslado,
                    }
                },
            
                _Cantidad: parseInt(c._Cantidad),
                _ClaveProdServ: c._ClaveProdServ,
                _ClaveUnidad: c._ClaveUnidad,
                _Descripcion: c._Descripcion,
                _Importe: parseFloat(c._Importe),
                _NoIdentificacion: c._NoIdentificacion,
                _ObjetoImp: c._ObjetoImp,
                _Unidad: c._Unidad,
                _ValorUnitario: parseFloat(c._ValorUnitario),
            });
        });

        this.Emisor = rawData.Emisor;

        this.Impuestos = [];
        rawData.Impuestos.forEach((i: any) => {
            let traslados: Traslado[] = [];

            i.Traslados.forEach((t: any) => {
                traslados.push({
                    _Base: parseFloat(t._Base),
                    _Importe: parseFloat(t._Base),
                    _Impuesto: parseFloat(t._Impuesto),
                    _TasaOCuota: parseFloat(t._TasaOCuota),
                    _TipoFactor: t._TipoFactor,
                })
            });

            this.Impuestos.push({
                Traslados: traslados,
                _TotalImpuestosTrasladados: parseFloat(i._TotalImpuestosTrasladados),
            })
        });

        this.Receptor = rawData.Receptor;

        this._Certificado = rawData._Certificado;
        this._Exportacion = rawData._Exportacion;
        this._Fecha = new Date(rawData._Fecha);
        this._Folio = rawData._Folio;
        this._FormaPago = rawData._FormaPago;
        this._LugarExpedicion = rawData._FormaPago;
        this._MetodoPago = rawData._MetodoPago;
        this._Moneda = rawData._Moneda;
        this._NoCertificado = rawData._NoCertificado;
        this._Sello = rawData._Sello;
        this._Serie = rawData._Serie;
        this._SubTotal = parseFloat(rawData._SubTotal);
        this._TipoCambio = rawData._TipoCambio;
        this._TipoDeComprobante = rawData._TipoCambio;
        this._Total = parseFloat(rawData._Total);
        this._Version = rawData._Version;
    }
}
interface CFDIIngreso{
    Complemento: Complemento,
    Conceptos: Concepto[],
    Emisor: Emisor,
    Impuestos: Impuesto[],
    Receptor: Receptor,

    _Certificado: string,
    _Exportacion: string,
    _Fecha: Date,
    _Folio: string,
    _FormaPago: string,
    _LugarExpedicion: string,
    _MetodoPago: string,
    _Moneda: string,
    _NoCertificado: string,
    _Sello: string,
    _Serie: string,
    _SubTotal: number,
    _TipoCambio: string,
    _TipoDeComprobante: 'I' | 'E' | 'T',
    _Total: number,
    _Version: string,
}

interface Complemento{
    TimbreFiscalDigital: {
        _FechaTimbrado: Date,
        _NoCertificadoSAT: string,
        _RfcProvCertif: string,
        _SelloCFD: string,
        _SelloSAT: string,
        _UUID: string,
        _Version: string,
    }
}

interface Concepto{
    Impuesto: {
        Traslados: {
            Traslado: Traslado,
        }
    }

    _Cantidad: number,
    _ClaveProdServ: string,
    _ClaveUnidad: string,
    _Descripcion: string,
    _Importe: number,
    _NoIdentificacion: string,
    _ObjetoImp: string,
    _Unidad: string,
    _ValorUnitario: number,
}

interface Traslado{
    _Base: number,
    _Importe: number,
    _Impuesto: number,
    _TasaOCuota: number,
    _TipoFactor: string,
}

interface Emisor{
    _Nombre: string,
    _RegimenFiscal: string,
    _Rfc: string,
}

interface Impuesto{
    Traslados: Traslado[],
    _TotalImpuestosTrasladados: number,
}

interface Receptor{
    _DomicilioFiscalReceptor: string,
    _Nombre: string,
    _RegimenFiscalReceptor: string,
    _Rfc: string,
    _UsoCFDI: string,
}