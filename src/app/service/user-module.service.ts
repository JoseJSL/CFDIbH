import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Accountant, Client, Manager, User } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserModuleService {

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) { }

  async createAccountant(email: string, password: string, rfc: string, firstName: string, lastName: string, isChild?: boolean): Promise<Accountant | null>{
    try{
      let currentUser: User | undefined = await this.getCurrentUser();

      const credentials = await this.auth.createUserWithEmailAndPassword(email, password);

      const birthDate = new Date(
        Number.parseInt(rfc.slice(4, 6)),
        Number.parseInt(rfc.slice(6, 8)),
        Number.parseInt(rfc.slice(8, 10)),
      );

      const accountant: Accountant = {
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        JoinDate: new Date(),
        RFC: rfc.toUpperCase(),
        UID: credentials.user!.uid,
        BirthDate: birthDate,
        DisplayName: firstName,
        Type: 'Accountant',
      }

      await this.afs.collection('User').doc(accountant.UID).set(accountant);
      //credentials.user!.sendEmailVerification(); -Verificación por correo

      if(isChild){
        await this.createClientManagerRelation(currentUser!, accountant);
      }

      return accountant;
    } catch (e) {
      return null;
    }
  }

  async createEnterprise(email: string, rfc: string, name: string): Promise<User | null>{
    try{
      const creationDate = new Date(
        Number.parseInt(rfc.slice(3, 5)),
        Number.parseInt(rfc.slice(5, 7)),
        Number.parseInt(rfc.slice(7, 9)),
      );

      const enterprise: User = {
        Email: email,
        JoinDate: new Date(),
        RFC: rfc.toUpperCase(),
        UID: this.afs.createId(), 
        BirthDate: creationDate,
        DisplayName: name,
        Type: 'Enterprise',
      }

      await this.afs.collection('User').doc(enterprise.UID).set(enterprise);
      
      const currentUser = await this.getCurrentUser();
      await this.createClientManagerRelation(currentUser!, enterprise);

      return enterprise;
    } catch (e) {
      return null;
    }
  }

  async createClientManagerRelation(manager: User, client: User): Promise<boolean>{
    try{
      await this.afs.collection('User').doc(manager!.UID).collection('Client').doc(client!.UID).set(
        {
          UID: client.UID,
          RFC: client.RFC,
          AddedDate: client.JoinDate,
          DisplayName: client.DisplayName,
        } as Client
      );
  
      await this.afs.collection('User').doc(client.UID).collection('Manager').doc(manager!.UID).set(
        {
          UID: manager.UID,
          RFC: manager.RFC,
          AddedDate: client.JoinDate,
          DisplayName: manager.DisplayName,
        } as Manager
      );

      return true;
    } catch(e){
      return false;
    }
  }

  async loginWithEmailAndPassword(email: string, password: string): Promise<Accountant | undefined>{
    try{
      const credentials = await this.auth.signInWithEmailAndPassword(email, password);

      if(!credentials.user) throw new Error();

      const uid = credentials.user.uid;

      const doc = await this.afs.collection<Accountant>('User').doc(uid).ref.get();

      return doc.data();
    } catch(e: any) {
      await this.auth.signOut();
      return undefined;
    }
  }

  async getCurrentUser(): Promise<Accountant | undefined>{
    return new Promise((resolve, reject) => {
      try{
        this.auth.user.subscribe(user => {
          this.afs.collection<Accountant>('User').doc(user!.uid).get().subscribe(doc => {
            doc.exists ? resolve(doc.data()) : reject(undefined);
          });
        });
      } catch(e){
        reject(undefined);
      }
    });
  }

  async getClientByRFC(managerUID: string, clientRFC: string): Promise<User | undefined>{
    return new Promise((resolve, reject) => {
      if(!managerUID || !clientRFC){
        reject(undefined);
      }

      this.afs.collection('User').doc(managerUID).collection<Client>('Client', ref => ref.where('RFC', '==', clientRFC)).get().subscribe(doc => {
        if(doc.empty){
          reject(undefined);
        } else {
          this.afs.collection<User>('User').doc(doc.docs[0].data().UID).get().subscribe(client => {
            client.exists ? resolve(client.data()) : reject(undefined);
          });
        }
      });
    })
  }

  async getUserClients(UID: string): Promise<User[]>{
    return new Promise((resolve) => {
      var clients: User[] = [];
      this.afs.collection('User').doc(UID).collection<User>('Client').get().subscribe(clientsDoc => {
        clientsDoc.docs.forEach(doc => {
          clients.push(doc.data());
        });
      });

      resolve(clients);
    }); 
  }

  async logOut(){
    await this.auth.signOut();
  }
}
