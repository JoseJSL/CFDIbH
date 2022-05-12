import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgressSpinnerComponent } from 'src/app/core/progress-spinner/progress-spinner.component';
import { UserModuleService } from 'src/app/service/user-module.service';
import { environment } from 'src/environments/environment.prod';
import { CustomValidators } from '../CustomValidators';

@Component({
  selector: 'enterprise-register-stepper',
  templateUrl: './enterprise-register-stepper.component.html',
  styleUrls: ['./enterprise-register-stepper.component.scss']
})
export class EnterpriseRegisterStepperComponent implements OnInit {
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  @Input() routeAfterRegister: string[] | undefined;
  public isEditable: boolean = true;
  public emailGroup: FormGroup;
  public enterpriseData: FormGroup;

  constructor(private userModule: UserModuleService, private builder: FormBuilder, private matSnackBar: MatSnackBar, private matDialog: MatDialog) { 
    this.emailGroup = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(environment.regex.noSpace)]],
    });
    this.emailGroup.addControl('repeatPassword', this.builder.control('', [Validators.required, CustomValidators.equals(this.emailGroup.controls['password'])]));

    this.enterpriseData = this.builder.group({
      name: ['', [Validators.required]],
      RFC: ['', [Validators.required, CustomValidators.rfc(true)]],
    });

  }

  ngOnInit(): void { }

  async createNewEnterprise(){
    const loading = this.matDialog.open(ProgressSpinnerComponent, { disableClose: true});

    try{
      if(!this.emailGroup.valid || !this.enterpriseData.valid){
        loading.close();
        this.matSnackBar.open('Revise los campos de registro antes de continuar', 'Ok');
      } else {
        const enterprise = await this.userModule.createEnterprise(
          this.emailGroup.controls['email'].value,
          this.enterpriseData.controls['RFC'].value,
          this.enterpriseData.controls['name'].value,
        );
    
        loading.close();
        this.matSnackBar.open('Empresa ' + enterprise!.DisplayName + ' creada con éxito.', undefined, { duration: 1750});
      }  
    } catch(e){
      loading.close();
      this.matSnackBar.open('Lo sentimos, ocurrió un error inesperado. Vueva a intentarlo más tarde', 'Ok');
    }
  }
}
