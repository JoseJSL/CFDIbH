import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Accountant } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserModuleService {

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) { }

  async createAccountant(email: string, password: string, rfc: string, firstName: string, lastName: string): Promise<Accountant | null>{
    try{
      const credentials = await this.auth.createUserWithEmailAndPassword(email, password);
      
      const accountant: Accountant = {
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        JoinDate: new Date(),
        RFC: rfc,
        UID: credentials.user!.uid,
      }

      this.afs.collection('Accountant').doc(accountant.UID).set(accountant);
      return accountant;
    } catch (e) {
      return null;
    }
  }

  createEnterprise(){

  }

  editAccountant(){

  }

  editEnterprise(){
    
  }

  loginWithEmail(){

  }

  logOut(){

  }
}
