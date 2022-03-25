import { Component, OnInit } from '@angular/core';
import { Egreso, Ingreso, Traslado } from '../service/cfdi';
import { XMLReaderService } from '../service/xml-reader.service';

@Component({
  selector: 'app-landing.page',
  templateUrl: './landing.page.component.html',
  styleUrls: ['./landing.page.component.scss']
})
export class LandingPage implements OnInit {

  constructor(private XMLReader: XMLReaderService) { }

  ngOnInit(): void {
  }

  async readXML($ev: any){

    const multiData = await this.XMLReader.readMultiple($ev.target.files);

    multiData.forEach(data => {
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
  }
}
