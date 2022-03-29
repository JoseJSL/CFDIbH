import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Egreso, Ingreso, Traslado } from 'src/app/service/cfdi';
import { XMLReaderService } from 'src/app/service/xml-reader.service';
import { DialogComponent } from '../dialog/dialog.component';

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

  public CFDIArray: (Ingreso | Egreso | Traslado)[] = [];

  constructor(private XMLReader: XMLReaderService, private matDialog: MatDialog) { }

  ngOnInit(): void {}

  async readFiles($ev: any){
    this.CFDIArray = []
    const files: File[] = $ev.target.files;
    const parsedFiles: any[] = await this.XMLReader.readMultiple(files);
    let i, n: number = 0;

    try{
      for(i = 0; i < files.length; i ++){
        n = i;
        switch(parsedFiles[i]._TipoDeComprobante){
          case("I"):
           this.CFDIArray.push(new Ingreso(parsedFiles[i]));
            break;
          case("E"):
            this.CFDIArray.push(new Egreso(parsedFiles[i]));
            break;
          case("T"):
            this.CFDIArray.push(new Traslado(parsedFiles[i]));
            break;
        }
      }

      console.log(this.CFDIArray);
    } catch(e){
      const dialog = this.matDialog.open(DialogComponent, {
        data: {
          title: 'Error al agregar archivos.',
          content: 'Ocurrió un error con el archivo ' + files[n].name,
          acceptText: 'Ok',
        }
      });

      dialog.afterClosed().subscribe(result => console.log(result));
    }
  }

}
