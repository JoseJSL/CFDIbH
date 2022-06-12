import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CFDI } from 'src/app/model/cfdi3.3';
import { XMLReaderService } from 'src/app/service/xml-reader.service';
import { DialogComponent } from '../dialog/dialog.component';

export interface XMLExport{
  RawFiles: File[],
  ParsedFiles: CFDI[],
}

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

  @Output() onDocumentsLoaded = new EventEmitter<XMLExport>(); 

  constructor(private XMLReader: XMLReaderService, private matDialog: MatDialog, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {}

  async readFiles($ev: any){
    let CFDIArray: CFDI[] = [];
    let rawFiles: File[] = [];

    const files: File[] = $ev.target.files;
    const parsedFiles: any[] = await this.XMLReader.readMultiple(files);
    let i, n: number = 0;

    try{
      for(i = 0; i < files.length; i ++){
        n = i;
        const cfdi = new CFDI(parsedFiles[i]);
        CFDIArray.push(cfdi);
      }

      if(CFDIArray.length > 0){
        const message = CFDIArray.length == 1 ? 
          'Cargando 1 archivo...' :
          `Cargando ${CFDIArray.length} archivos...`;
          
        this.matSnackBar.open(message, undefined, { duration: 2000, });

        this.onDocumentsLoaded.emit({
          RawFiles: files,
          ParsedFiles: CFDIArray,
        });
      }
    } catch(e){
      console.error(e);
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
