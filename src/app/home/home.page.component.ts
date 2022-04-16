import { Component, OnInit } from '@angular/core';
import { Accountant, Enterprise } from '../service/user';
import { UserModuleService } from '../service/user-module.service';

@Component({
  selector: 'app-home.page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {
  public selectedPerson: string = 'current';
  public shouldDrawerOpen: boolean = window.innerWidth >= 768;
  public user: Accountant | Enterprise | undefined;

  constructor(private userModule: UserModuleService) { }

  async ngOnInit(){
    this.user = await this.userModule.getCurrentUser('Accountant');
  }

  logOut(){
    this.userModule.logOut();
  }

  handleResize(event: any){
    try{
      this.shouldDrawerOpen = event.target.innerWidth >= 768;
    } catch(e){}
  }
}
