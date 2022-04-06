import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProgressSpinnerComponent } from 'src/app/core/progress-spinner/progress-spinner.component';
import { UserModuleService } from 'src/app/service/user-module.service';

@Component({
  selector: 'login-form-dialog',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private matDialog: MatDialog, private matSnackBar: MatSnackBar, private userModule: UserModuleService, private builder: FormBuilder, private router: Router) {
    this.loginForm = this.builder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      userType: ['Accountant', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  async tryLogin(){
    const loading = this.matDialog.open(ProgressSpinnerComponent, { disableClose: true });

    const user = await this.userModule.loginWithEmailAndPassword(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value,
      this.loginForm.controls['userType'].value,
    );

    loading.close();
    
    if(user){
      this.matDialog.closeAll();
      this.router.navigate(['/home']);
      
      const name = (user as any).Name ? (user as any).Name : (user as any).FirstName;

      this.matSnackBar.open('Bienvenido, ' + name, undefined, { duration: 2000 });
    } else{
      this.matSnackBar.open('El correo o la contraseña no son válidos.', 'Ok');
    }
  }

}
