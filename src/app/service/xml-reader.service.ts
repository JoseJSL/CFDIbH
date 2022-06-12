import { Injectable } from '@angular/core';
import { XMLParser, X2jOptions, XMLBuilder } from 'fast-xml-parser';
import { CFDI } from '../model/cfdi3.3';

@Injectable({
  providedIn: 'root'
})

export class XMLReaderService {
  private parser: XMLParser;
  private parserOptions: Partial<X2jOptions> = {
    ignoreAttributes: false,
    attributeNamePrefix: '_',
  };

  constructor() {
    this.parser = new XMLParser(this.parserOptions);
  }

  public async readOne(file: File): Promise<any> {
    const data = file.type === 'text/xml' ? this.parser.parse(await this.getFileData(file)) : null;
    return data['Comprobante'] ? data['Comprobante'] : null;
  }

  public async readMultiple(files: File[]): Promise<any[]> {
    let filesData: any[] = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i].type === 'text/xml') {
        filesData.push(await this.readOne(files[i]));
      }
    }

    return filesData;
  }

  private async getFileData(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          resolve(this.prepareTextContent(reader.result.toString()));
        } else {
          reject('');
        }
      };

      reader.onerror = () => { reject('') };
      reader.readAsText(file);
    });
  }

  private prepareTextContent(fileText: string) {
    return fileText
      .replace(new RegExp('cfdi:', 'g'), '')
      .replace(new RegExp('tfd:', 'g'), '');
  }

  public objectToXML(data: any) {
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '_',
    });

    return builder.build(data);
  }

  public ParseMultipleText(data: string[]) {
    let result: any[] = [];

    for (let i = 0; i < data.length; i++) {
      result.push(this.ParseText(data[i]));
    }

    return result;
  }

  public ParseText(data: string) {
    data = this.prepareTextContent(data);
    const parsedData = this.parser.parse(data);
    return parsedData['Comprobante'] ? parsedData['Comprobante'] : null;
  }

  public JsonArrayToCFDI(data: any[]): CFDI[] {
    let CFDIArray: CFDI[] = [];

    try {
      for (let i = 0; i < data.length; i++) {
        const cfdi = new CFDI(data[i])
        CFDIArray.push(cfdi);
      }
      
      return CFDIArray;
    } catch (e) {
      console.error(e);
      return CFDIArray;
    }
  }
}
