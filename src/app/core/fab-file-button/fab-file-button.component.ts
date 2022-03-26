import { Component, Input, OnInit } from '@angular/core';
import { Egreso, Ingreso, Traslado } from 'src/app/service/cfdi';
import { XMLReaderService } from 'src/app/service/xml-reader.service';

@Component({
  selector: 'fab-file-button',
  templateUrl: './fab-file-button.component.html',
  styleUrls: ['./fab-file-button.component.scss']
})
export class FabFileButtonComponent implements OnInit {
  @Input() buttonColor: 'primary' | 'accent' | 'warn' | undefined;
  @Input() iconColor: 'primary' | 'accent' | 'warn' | undefined;
  @Input() iconName!: string | undefined;
  @Input() label: string | undefined;

  public ParsedFiles: any[] = [];
  public CFDIArray: (Ingreso | Egreso | Traslado)[] = [];

  constructor(private XMLReader: XMLReaderService) { }

  ngOnInit(): void {}

  async readFiles($ev: any){
    this.ParsedFiles = await this.XMLReader.readMultiple($ev.target.files);
    try{

      this.ParsedFiles.forEach(data => {
        switch(data._TipoDeComprobante){
          case("I"):
            console.log(new Ingreso(data));
            break;
          case("E"):
            console.log(new Egreso(data));
            break;
          case("T"):
            console.log(new Traslado(data));
            break;
        }
      });

    } catch(e){
      console.log()
    }
  }

}
