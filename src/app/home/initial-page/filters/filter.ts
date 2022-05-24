export interface CFDIFilter{
    receptor?: string[],
    emisor?: string[],
    subtotalMayorQue?: number,
    subtotalMenorQue?: number,
    desdeFecha?: Date,
    hastaFecha?: Date,
    tipo?: 'I' | 'E' | 'T' | 'N' | 'P',
    formaPago?: 'Efectivo' | 'Cheque nominativo' | 'Transferencia electrónica de fondos' | 'Por definir';
    metodoPago?: 'En una sola excibición' | 'En parcialidades o diferido';
}