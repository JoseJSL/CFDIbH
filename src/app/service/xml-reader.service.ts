import { Injectable } from '@angular/core';
import { XMLParser, X2jOptions } from 'fast-xml-parser';

@Injectable({
  providedIn: 'root'
})
export class XMLReaderService {
  private parser: XMLParser;
  private parserOptions: Partial<X2jOptions> = {
    ignoreAttributes: false,
    attributeNamePrefix : "_",
  };

  constructor() {
    this.parser = new XMLParser(this.parserOptions);
  }

  async readMultiple(files: File[]): Promise<string[]>{
    let filesData: any[] = [];
    
    for(let i = 0; i < files.length; i++){
      if(files[i].type === "text/xml"){
        filesData.push(this.parser.parse(await this.getFileData(files[i])));
      }
    }

    return filesData;
  }

  private async getFileData(file: File): Promise<string>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
}
