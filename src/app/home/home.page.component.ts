import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Accountant, Client } from '../service/user';
import { UserModuleService } from '../service/user-module.service';

@Component({
  selector: 'app-home.page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {
  public user: Accountant | undefined;
  public userClients: Client[] = [];
  public showLoadingClients: boolean = true;

  public shouldDrawerOpen: boolean = true;
  public drawerBackdrop: boolean = window.innerWidth <= 768;;
  public drawerMode: 'side' | 'over' = window.innerWidth >= 768 ? 'side' : 'over';

  constructor(private userModule: UserModuleService, private afs: AngularFirestore, private router: Router) {
    if(this.user === undefined){
      this.userModule.getCurrentUser().then(async v => {
        this.user = v;

        this.afs.collection('User').doc(this.user!.UID).collection<Client>('Client').valueChanges().subscribe(docs => {
          this.userClients = docs;
          this.showLoadingClients = false;
        })
      });
    }
  }

  ngOnInit(): void{
  }

  logOut(){
    this.userModule.logOut().then(
      t => this.router.navigate(['/']),
      f => this.logOut(),
    );
  }

  handleResize(event: any){
    try{
      if(event.target.innerWidth >= 768){
        this.drawerBackdrop = false;
        this.drawerMode = 'side';
      } else {
        this.shouldDrawerOpen = true;
        this.drawerBackdrop = true;
        this.drawerMode = 'over';
      }

    } catch(e){}
  }
}
