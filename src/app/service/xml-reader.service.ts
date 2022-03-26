import { Injectable } from '@angular/core';
import { XMLParser, X2jOptions, XMLBuilder } from 'fast-xml-parser';
import { BucketService } from './bucket.service';

@Injectable({
  providedIn: 'root'
})

export class XMLReaderService {
  private parser: XMLParser;
  private parserOptions: Partial<X2jOptions> = {
    ignoreAttributes: false,
    attributeNamePrefix : '_',
  };

  constructor(private bucket: BucketService) {
    this.parser = new XMLParser(this.parserOptions);
  }

  public async readOne(file: File): Promise<any>{
    const data = file.type === 'text/xml' ? this.parser.parse(await this.getFileData(file)) : null;
    return data['Comprobante'] ? data['Comprobante'] : null;
  }

  public async readMultiple(files: File[]): Promise<any[]>{
    let filesData: any[] = [];
    
    for(let i = 0; i < files.length; i++){
      if(files[i].type === 'text/xml'){
        filesData.push(await this.readOne(files[i]));
      }
    }

    return filesData;
  }
  
  private async getFileData(file: File): Promise<string>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        let res: string = '';

        if(reader.result){
          res = reader.result.toString()
            .replace(new RegExp('cfdi:', 'g'), '')
            .replace(new RegExp('tfd:', 'g'), '');
        }

        resolve(res)
      };

      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  public objectToXML(data: any){
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '_',
    });

    return builder.build(data);
  }
}
