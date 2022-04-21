import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { XMLExport } from 'src/app/core/fab-file-button/fab-file-button.component';
import { BucketService } from 'src/app/service/bucket.service';
import { User } from 'src/app/service/user';
import { UserModuleService } from 'src/app/service/user-module.service';
import { XMLReaderService } from 'src/app/service/xml-reader.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
  public xmlsData: any[] = [];
  public xmlsCols: string[] = [];
  public selectedUser?: User;

  constructor(private route: ActivatedRoute, private bucketService: BucketService, private XMLParser: XMLReaderService, private userModule: UserModuleService, private router: Router, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      if(!params['rfc']){
        this.selectedUser = await this.userModule.getCurrentUser();
      } else {
        const current = await this.userModule.getCurrentUser();
        const paramUser = await this.userModule.getClientByRFC(current!.UID, params['rfc']);
        
        if(!paramUser){
          this.matSnackBar.open('No tiene ningún asociado con el RFC: ' + params['rfc'], 'Ok', {duration: 1750});
          this.router.navigate(['/app', 'associates']);
        } else {
          this.selectedUser = paramUser;
        }
      }
    });
  }

  async onDocumentsLoad(docs: XMLExport){
    let index: number[] = [];

    try{
      for(let i = 0; i < docs.RawFiles.length; i++){
        const url = await this.bucketService.uploadXML(this.selectedUser!.UID, docs.RawFiles[i], docs.ParsedFiles[i]._NoCertificado);
        
        if(url.length == 0 ){
          index.push(i);
        } else {
          this.matSnackBar.open('Archivo ' + docs.RawFiles[i].name + ' subido con éxito', undefined, { duration: 1000 });
        }
      }

      if(index.length > 0){
        let names = '';

        for(let i = 0; i < index.length - 1; i++){
          names += docs.RawFiles[i].name + ", "
        }

        names += docs.RawFiles[index[index.length]]

        this.matSnackBar.open('Ocurrió un error al subir los archivo(s) ' + names + '.', 'Ver más', { duration: 2500 }).afterDismissed().subscribe(dismiss => {
          if(dismiss.dismissedByAction){
            this.matSnackBar.open('Los siguientes archivo(s) no se subieron con éxito: ' + names, 'Ok');
          }
        });
      } else {
        this.matSnackBar.open('Todos los archivos se subieron con éxito', undefined, { duration: 1750 });
      }
    } catch(e){
      this.matSnackBar.open('Ocurrió un error al tratar de subir los archivos', 'Ok');
    }

    this.reloadTableData();
  }

  async reloadTableData(){
    const files = await this.bucketService.readAllUserRawXML(this.selectedUser!.UID);
    console.log(files);

    const parsedFiles = this.XMLParser.ParseMultipleText(files);
    console.log(parsedFiles);

    const CFDIArray = this.XMLParser.JsonArrayToCFDI(parsedFiles);
    console.log(CFDIArray);
  }
}
