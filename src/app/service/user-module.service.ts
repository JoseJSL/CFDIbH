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
      }

      this.afs.collection('Accountant').doc(accountant.UID).set(accountant);
      return accountant;
    } catch (e) {
      return null;
    }
  }

  async createEnterprise(email: string, password: string, rfc: string, name: string): Promise<Enterprise | null>{
    try{
      const credentials = await this.auth.createUserWithEmailAndPassword(email, password);

      if(credentials.user === null){
        throw new Error();
      }

      const enterprise: Enterprise = {
        Email: email,
        Name: name,
        JoinDate: new Date(),
        RFC: rfc.toUpperCase(),
        UID: credentials.user!.uid,
        Accountants: [],
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
      await this.auth.signOut();
      return undefined;
    }
  }

  logOut(){

  }
}
