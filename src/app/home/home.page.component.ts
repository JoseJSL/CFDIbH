import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accountant } from '../service/user';
import { UserModuleService } from '../service/user-module.service';

@Component({
  selector: 'app-home.page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {
  public selectedPerson: string = 'current';
  public shouldDrawerOpen: boolean = window.innerWidth >= 768;
  public user: Accountant | undefined;

  constructor(private userModule: UserModuleService, private router: Router) { }

  ngOnInit(): void{
    if(this.user === undefined){
      this.userModule.getCurrentUser().then(v => this.user = v);
    }
  }

  logOut(){
    this.userModule.logOut().then(
      t => this.router.navigate(['/']),
      f => this.logOut(),
    );
  }

  handleResize(event: any){
    try{
      this.shouldDrawerOpen = event.target.innerWidth >= 768;
    } catch(e){}
  }
}
