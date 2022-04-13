import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Accountant, Enterprise } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserModuleService {

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) { }

  async createAccountant(email: string, password: string, rfc: string, firstName: string, lastName: string): Promise<Accountant | null>{
    try{
      const credentials = await this.auth.createUserWithEmailAndPassword(email, password);
      const birthDate = new Date(
        Number.parseInt(rfc.slice(4, 6)),
        Number.parseInt(rfc.slice(6, 8)),
        Number.parseInt(rfc.slice(8, 10)),
      );

      if(credentials.user === null){
        throw new Error();
      }
      
      const accountant: Accountant = {
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        JoinDate: new Date(),
        RFC: rfc.toUpperCase(),
        UID: credentials.user!.uid,
        BirthDate: birthDate,
        DisplayName: firstName,
      }

      await this.afs.collection('Accountant').doc(accountant.UID).set(accountant);
      //credentials.user!.sendEmailVerification(); -Verificación por correo
      return accountant;
    } catch (e) {
      return null;
    }
  }

  async createEnterprise(email: string, password: string, rfc: string, name: string): Promise<Enterprise | null>{
    try{
      const credentials = await this.auth.createUserWithEmailAndPassword(email, password);
      const creationDate = new Date(
        Number.parseInt(rfc.slice(3, 5)),
        Number.parseInt(rfc.slice(5, 7)),
        Number.parseInt(rfc.slice(7, 9)),
      );

      if(credentials.user === null){
        throw new Error();
      }

      const enterprise: Enterprise = {
        Email: email,
        JoinDate: new Date(),
        RFC: rfc.toUpperCase(),
        UID: credentials.user!.uid,
        Accountants: [],
        BirthDate: creationDate,
        DisplayName: name,
      }

      this.afs.collection('Enterprise').doc(enterprise.UID).set(enterprise);
      
      return enterprise;
    } catch (e) {
      return null;
    }
  }

  editAccountant(){

  }

  editEnterprise(){
    
  }

  async loginWithEmailAndPassword(email: string, password: string, userType: 'Accountant' | 'Enterprise'): Promise<Accountant | Enterprise | undefined>{
    try{
      const credentials = await this.auth.signInWithEmailAndPassword(email, password);

      if(!credentials.user) throw new Error();

      const uid = credentials.user.uid;

      const doc = await this.afs.collection<Accountant | Enterprise>(userType).doc(uid).ref.get();

      if((doc as any).FirstName && userType == 'Accountant'){
        throw new Error();
      } else if((doc as any).Name && userType === 'Enterprise'){
        throw new Error();
      }
      return doc.data();
    } catch(e) {
      console.error(e);
      await this.auth.signOut();
      return undefined;
    }
  }

  async getCurrentUser(userType: 'Accountant' | 'Enterprise'): Promise<Accountant | Enterprise | undefined>{
    try{
      const uid = (await this.auth.currentUser)!.uid;

      return new Promise((resolve, reject) => {
        this.afs.collection<Accountant>(userType).doc(uid).get().subscribe(doc => {
          doc.exists ? resolve(doc.data()) : reject(undefined);
        })
      });
    } catch(e){
      console.error(e);
      return undefined;
    }
  }

  async logOut(){
    await this.auth.signOut();
  }
}
