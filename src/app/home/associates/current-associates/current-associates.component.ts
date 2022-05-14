import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Accountant, User } from 'src/app/service/user';
import { UserModuleService } from 'src/app/service/user-module.service';

@Component({
  selector: 'current-associates',
  templateUrl: './current-associates.component.html',
  styleUrls: ['./current-associates.component.scss']
})
export class CurrentAssociatesComponent implements OnInit {
  public currentUser?: User;
  public currentUserAssociates: (Accountant | User)[] = [];
  constructor(private userModule: UserModuleService, private matSnackBar: MatSnackBar) { }

  async ngOnInit() {
    this.currentUser = await this.userModule.getCurrentUser();
    if(this.currentUser){
      let userData: User | undefined;
      const associates = await this.userModule.getUserClients(this.currentUser.UID);
      
      for(let i = 0; i < associates.length; i++){
        userData = await this.userModule.getUserData(associates[i].UID);

        if(userData){
          this.currentUserAssociates.push(userData);
        }
      }
    }
  }

  asAccountant(client: Accountant | User): Accountant{
    return client as Accountant;
  }

  async editUserData(user: Accountant | User){
    if(this.currentUser){
      const success = await this.userModule.editUserData(user);

      if(success){
        this.matSnackBar.open(`Usuario ${ user.DisplayName } editado con éxito.`, undefined, { duration: 1750 });
      } else {
        this.matSnackBar.open(`Ocurrió un error, vuelva a intentarlo más tarde`, 'Ok');
      }
    } else {
      this.matSnackBar.open('Ocurrió un error inesperado, recarge la página y vuelva a intentarlo.', 'Ok');
    }
  }

  async deleteUser(user: Accountant | User){
    if(this.currentUser){
      const success = await this.userModule.deleteClientManagerRelation(this.currentUser, user);
      if(success){
        this.matSnackBar.open(`Usuario ${user.DisplayName} eliminado con éxito.`, undefined, { duration: 1750 });
      } else {
        this.matSnackBar.open(`Ocurrió un error, vuelva a intentarlo más tarde`, 'Ok');
      }
    }
  }
}