import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor(private storage: AngularFireStorage, private http: HttpClient) { }

  async uploadXML(userUID: string, file: File, _Folio: string): Promise<string>{
    const upload = await this.storage.upload(`XML/${userUID}/${_Folio}`, file);
    return await upload.ref.getDownloadURL();
  }

  async getUserXmlUrl(userUID: string, _Folio: string): Promise<string>{
    const observer = this.storage.ref('XML').child(userUID).child(_Folio).getDownloadURL();

    return new Promise((resolve, reject) => {
      observer.subscribe(url => url? resolve(url) : reject(url));
    });
  }

  async readAllUserXML(userUID: string): Promise<string[]>{
    let XMLs: string[] = [];

    this.storage.ref('XML').child(userUID).listAll().subscribe(list => {
      list.items.forEach(async ref => {
        this.http.get(await ref.getDownloadURL(), {responseType: 'text'}).subscribe(response => {
          XMLs.push(response);
        })
      })
    })

    return XMLs;
  }

  async readXmlWithUrl(url: string){
    return new Promise((resolve, reject) => {
      this.http.get(url, {responseType: 'text'}).subscribe(
        success => resolve(success),
        error => reject(error),
      );
    });
  }
}
