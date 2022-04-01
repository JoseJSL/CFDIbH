import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from './CustomValidators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModuleService } from 'src/app/service/user-module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-register-stepper',
  templateUrl: './user-register-stepper.component.html',
  styleUrls: ['./user-register-stepper.component.scss']
})

export class UserRegisterStepperComponent implements OnInit {
  public isEditable: boolean = true;
  public emailGroup: FormGroup;
  public userData: FormGroup;

  constructor(private userModule: UserModuleService, private router: Router, private builder: FormBuilder, private matSnackBar: MatSnackBar) { 
    this.emailGroup = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(environment.regex.noSpace)]],
    });
    this.emailGroup.addControl('repeatPassword', this.builder.control('', [Validators.required, CustomValidators.equals(this.emailGroup.controls['password'])]));

    this.userData = this.builder.group({
      firstName: ['', [Validators.required, Validators.pattern(environment.regex.fullName)]],
      lastName: ['', [Validators.required, Validators.pattern(environment.regex.fullName)]],
      RFC: ['', [Validators.required, CustomValidators.rfc(true)]],
    });

  }

  ngOnInit(): void { }

  async createNewAccountant(){
    if(!this.emailGroup.valid || !this.userData.valid){
      this.matSnackBar.open('Revise los campos de registro antes de continuar', 'Ok');
    } else {
      const accountant = await this.userModule.createAccountant(
        this.emailGroup.controls['email'].value,
        this.emailGroup.controls['password'].value,
        this.userData.controls['RFC'].value,
        this.userData.controls['firstName'].value,
        this.userData.controls['lastName'].value,        
      );

      if(accountant){
        this.matSnackBar.open('Bienvenido, ' + accountant.FirstName + '.');
        this.router.navigate(['']);
      } else {
        this.matSnackBar.open('Lo sentimos, ocurrió un error inesperado. Vueva a intentarlo más tarde', 'Ok');
      }
    }
  }
}
