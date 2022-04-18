import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  @Output() documentsData = new EventEmitter<(Ingreso | Egreso | Traslado)[]>(); 

  public CFDIArray: (Ingreso | Egreso | Traslado)[] = [];

  constructor(private XMLReader: XMLReaderService, private matDialog: MatDialog, private matSnackBar: MatSnackBar) { }

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
      this.documentsData.emit(this.CFDIArray);

      if(this.CFDIArray.length > 0){
        const message = this.CFDIArray.length == 1 ? 
          'Se agregó 1 archivo con éxito.' :
          `Se han agregado ${this.CFDIArray.length} archivos con éxito.`;
          
        this.matSnackBar.open(
          message,
          undefined,
          { duration: 2000, },
        );
      }
    } catch(e){
      const dialog = this.matDialog.open(DialogComponent, {
        data: {
          title: 'Error al agregar archivos.',
          content: 'Ocurrió un error con el archivo ' + files[n].name,
          acceptText: 'Ok',
        }
      });
    }
  }

}
