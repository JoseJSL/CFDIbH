export interface CFDIFilter{
    receptor?: string[],
    emisor?: string[],
    subtotalMayorQue?: number,
    subtotalMenorQue?: number,
    desdeFecha?: Date,
    hastaFecha?: Date,
}