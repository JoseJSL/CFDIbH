import { Component, OnInit } from '@angular/core';
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
    console.log(await this.XMLReader.readMultiple($ev.target.files));
  }
}
