import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserModuleService {

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) { }

  createAccountant(){
    
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
