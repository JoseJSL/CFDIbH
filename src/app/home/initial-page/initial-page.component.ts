import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/service/user';
import { UserModuleService } from 'src/app/service/user-module.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
  public xmlsData: any[] = [];
  public xmlsCols: string[] = [];
  public selectedUser?: User;

  constructor(private route: ActivatedRoute, private userModule: UserModuleService, private router: Router, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      if(!params['rfc']){
        this.selectedUser = await this.userModule.getCurrentUser();
      } else {
        const current = await this.userModule.getCurrentUser();
        const paramUser = await this.userModule.getClientByRFC(current!.UID, params['rfc']);
        
        if(!paramUser){
          this.matSnackBar.open('No tiene ningún asociado con el RFC: ' + params['rfc'], 'Ok', {duration: 1750});
          this.router.navigate(['/app', 'associates']);
        } else {
          this.selectedUser = paramUser;
        }
      }
    });
  }

  onDocumentsLoad(docs: any){
    console.log(docs);
  }

}
