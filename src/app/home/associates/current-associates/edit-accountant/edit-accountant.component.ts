import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogComponentData } from 'src/app/core/dialog/dialog.component';
import { CustomValidators } from 'src/app/landing/register/CustomValidators';
import { Accountant } from 'src/app/service/user';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'edit-accountant',
  templateUrl: './edit-accountant.component.html',
  styleUrls: ['./edit-accountant.component.scss']
})
export class EditAccountantComponent implements OnInit {
  private originalData!: Accountant;
  @Input() accountantData!: Accountant;
  @Output() editUserData: EventEmitter<Accountant> = new EventEmitter();
  @Output() deleteUser: EventEmitter<Accountant> = new EventEmitter();

  public Cols: number = window.innerWidth <= 768 ? window.innerWidth <= 576 ? 1 : 2 : 3;
  public userData!: FormGroup;
  constructor(private builder: FormBuilder, private matDialog: MatDialog) { }

  handleResize(event: any){
    try{
      this.Cols = event.target.innerWidth <= 768 ? event.target.innerWidth <= 576 ? 1 : 2 : 3;
    } catch(e){}
  }

  ngOnInit(): void {
    this.userData = this.builder.group({
      firstName: [this.accountantData.FirstName, [Validators.required, Validators.pattern(environment.regex.fullName)]],
      lastName: [this.accountantData.LastName, [Validators.required, Validators.pattern(environment.regex.fullName)]],
      RFC: [this.accountantData.RFC, [Validators.required, CustomValidators.rfc(false)]],
    });
    this.originalData = {...this.accountantData};
  }

  dataHasChanged(): boolean{
    if(this.originalData.FirstName !== this.accountantData.FirstName) return true;
    if(this.originalData.LastName !== this.accountantData.LastName) return true;
    if(this.originalData.RFC !== this.accountantData.RFC) return true;
    return false;
  }

  confirmEdit(){
    if(this.userData.valid){
      this.accountantData.FirstName = this.userData.controls['firstName'].value;
      this.accountantData.LastName = this.userData.controls['lastName'].value;
      this.accountantData.RFC = this.userData.controls['RFC'].value;

      if(this.dataHasChanged()){
        this.accountantData.DisplayName = this.accountantData.FirstName;
        this.accountantData.FullName = this.accountantData.FirstName + ' ' + this.accountantData.LastName;
        this.accountantData.BirthDate = CustomValidators.getPersonBirthDate(this.accountantData.RFC);
  
        this.editUserData.emit(this.accountantData);
      }
    }
  }

  openDeleteDialog(){
    const data: DialogComponentData = {
      title: `¿Eliminar a ${this.accountantData.DisplayName} de asociados?`,
      content: 'No se eliminarán los documentos de éste, pero ya no podrá ver ni modificar sus documentos.',
      acceptText: 'Eliminar',
      cancelText: 'Cancelar',
      acceptColor: 'warn',
    }
    this.matDialog.open(DialogComponent, {data: data}).afterClosed().subscribe(accepted => {
      if(accepted){
        this.deleteUser.emit(this.accountantData);
      }
    });
  }
}
