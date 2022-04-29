import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { XMLExport } from 'src/app/core/fab-file-button/fab-file-button.component';
import { BucketService } from 'src/app/service/bucket.service';
import { User } from 'src/app/service/user';
import { UserModuleService } from 'src/app/service/user-module.service';
import { XMLReaderService } from 'src/app/service/xml-reader.service';
import { filter, firstValueFrom } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';
import { CardTableComponent } from './card-table/card-table.component';
import { Egreso, Ingreso, Traslado } from 'src/app/service/cfdi';
import { CardChartsComponent } from './card-charts/card-charts.component';
import { CFDIFilter } from './filters/filter';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
  @ViewChild('cardTable') cardTable!: CardTableComponent;
  @ViewChild('cardChart') cardChart!: CardChartsComponent;

  public xmlsData: (Ingreso | Egreso | Traslado)[] = [];
  public xmlsCols: string[] = ['Concepto', 'Emisor', 'Receptor', 'Subtotal'];
  public selectedUser?: User;
  public showLoadingTable: boolean = true;

  public swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    allowTouchMove: window.innerWidth <= 768,
    navigation: true,
  };

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private bucketService: BucketService, private XMLParser: XMLReaderService, private userModule: UserModuleService, private router: Router, private matSnackBar: MatSnackBar) { }

  async ngOnInit() {
    const params = await firstValueFrom(this.route.params);
    const current = await this.userModule.getCurrentUser();

    if(!params['rfc']){
      this.selectedUser = current;
    } else {
      const paramUser = await this.userModule.getClientByRFC(current!.UID, params['rfc']);

      if(!paramUser){
        this.matSnackBar.open('No tiene ningún asociado con el RFC: ' + params['rfc'], 'Ok', {duration: 1750});
        this.router.navigate(['/app', 'associates']);
      } else {
        this.selectedUser = paramUser;
      }
    }

    if(this.selectedUser){
      this.afs.collection('User').doc(this.selectedUser.UID).collection('XML').valueChanges().subscribe(async xmlsCollection => {
        console.log("Cambio detectado: " + xmlsCollection.length);
        if(this.xmlsData.length !== xmlsCollection.length){
          this.xmlsData = xmlsCollection.length > 0 ? await this.fullyParseRawXMLS() : [];
          if(this.cardTable){
            this.cardTable.refreshTable(this.xmlsData);            
          }

          if(this.cardChart){
            this.cardChart.refreshData(this.xmlsData);
          }
        }

        this.showLoadingTable = false;
      });
    }
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
        if(docs.RawFiles.length > 0 ){
          this.matSnackBar.open('Todos los archivos se subieron con éxito', undefined, { duration: 1750 });
        }
      }
    } catch(e){
      this.matSnackBar.open('Ocurrió un error al tratar de subir los archivos', 'Ok');
    }
  }

  async fullyParseRawXMLS(): Promise<(Ingreso | Egreso | Traslado)[]>{
    const files = await this.bucketService.readAllUserRawXML(this.selectedUser!.UID);
    const parsedFiles = this.XMLParser.ParseMultipleText(files);
    return this.XMLParser.JsonArrayToCFDI(parsedFiles);
  }

  public updateChildrens(filters: CFDIFilter){
    let filteredData: (Ingreso | Egreso | Traslado)[] = [];
    this.xmlsData.forEach(d => filteredData.push(Object.assign({}, d)));

    if(filters.receptor && filters.receptor.length > 0){
      filteredData = filteredData.filter(data => filters.receptor!.indexOf(data.Receptor._Nombre) !== -1);
    }

    if(filters.emisor && filters.emisor.length > 0){
      filteredData = filteredData.filter(data => filters.emisor!.indexOf(data.Emisor._Nombre) !== -1);
    }

    if(filters.desdeFecha){
      filteredData = filteredData.filter(data => data._Fecha >= filters.desdeFecha!);
    }

    if(filters.hastaFecha){
      filteredData = filteredData.filter(data => data._Fecha >= filters.hastaFecha!);
    }

    if(this.cardTable){
      this.cardTable.refreshTable(filteredData);
    }

    if(this.cardChart){
      this.cardChart.refreshData(filteredData);
    }
  }
}
