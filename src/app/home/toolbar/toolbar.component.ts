import { Component, OnInit } from '@angular/core';
import { Accountant, Enterprise } from 'src/app/service/user';
import { UserModuleService } from 'src/app/service/user-module.service';

@Component({
  selector: 'home-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class HomeToolbarComponent implements OnInit {
  public user: Accountant | Enterprise | undefined;

  constructor(private userModule: UserModuleService) { }

  async ngOnInit(){
    this.user = await this.userModule.getCurrentUser('Accountant');
  }

  logOut(){
    this.userModule.logOut();
  }

}
