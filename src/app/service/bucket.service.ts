import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Egreso, Ingreso, Traslado } from './cfdi';
import { first, firstValueFrom } from 'rxjs';

export interface XMLReference {
  _NoCertificado: string,
  URL: string,
  userUID:  string,
  addedAt: Date,
}

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private http: HttpClient, private auth: AngularFireAuth) { }

  async uploadXMLToCurrentUser(file: File, _NoCertificado: string):  Promise<string>{
    return new Promise((resolve, reject) => {
      this.auth.user.subscribe(async user => {
        user ? resolve(await this.uploadXML(user.uid, file, _NoCertificado)) : reject('');
      });
    });
  }

  async uploadXML(userUID: string, file: File, _NoCertificado: string): Promise<string>{
    const upload = await this.storage.upload(`XML/${userUID}/${_NoCertificado}`, file);
    const url = await upload.ref.getDownloadURL();

    await this.afs.collection('User').doc(userUID).collection<XMLReference>('XML').doc(_NoCertificado).set(
      {
        URL: url,
        _NoCertificado: _NoCertificado,
        addedAt: new Date(),
        userUID: userUID,
      }
    );

    return url;
  }

  async getCurrentUserXmlUrl(_NoCertificado: string): Promise<string>{
    return new Promise((resolve, reject) => {
      this.auth.user.subscribe(async user => {
        user ? resolve(await this.getUserXmlUrl(user.uid, _NoCertificado)) : reject('');
      });
    });
  }

  async getUserXmlUrl(userUID: string, _NoCertificado: string): Promise<string>{
    const observer = this.storage.ref('XML').child(userUID).child(_NoCertificado).getDownloadURL();

    return new Promise((resolve, reject) => {
      observer.subscribe(url => url? resolve(url) : reject(url));
    });
  }

  async readAllCurrentUserRawXML(): Promise<string[]>{
    let userUID = (await firstValueFrom(this.auth.user))?.uid;

    if(userUID){
      return await this.readAllUserRawXML(userUID);
    } else {
      return [];
    }
  }

  async readAllUserRawXML(userUID: string): Promise<string[]>{
    let XMLs: string[] = [];

    const list = await firstValueFrom(this.afs.collection('User').doc(userUID).collection<XMLReference>('XML').get());
    
    let response: string | undefined;
    try{
      for(let i = 0; i < list.size; i++){
        response = await firstValueFrom(this.http.get(list.docs[i].data().URL, {responseType: 'text'}));

        if(response){
          if(response.length > 0){
            XMLs.push(response);
          } else {
            throw new Error('No response from: ' + list.docs[i].data().URL);
          }
        } else {
          throw new Error('No response from: ' + list.docs[i].data().URL);
        }
      }
    } catch(e){
      console.error(e);
      return [];
    }

    return XMLs;
  }

  async readXmlWithUrl(url: string): Promise<string>{
    let response = await firstValueFrom(this.http.get(url, {responseType: 'text'}));
    return response ? response : '';
  }

  async deleteXml(userUID: string, _NoCertificado: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.storage.ref(`XML/${userUID}/${_NoCertificado}`).delete().subscribe(
        s => { resolve(true) },
        e => { reject(false) },
      );
    });
  }
}
