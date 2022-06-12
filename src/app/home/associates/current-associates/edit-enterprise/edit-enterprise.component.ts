import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogComponentData } from 'src/app/core/dialog/dialog.component';
import { CustomValidators } from 'src/app/landing/register/CustomValidators';
import { User } from 'src/app/model/user';

@Component({
  selector: 'edit-enterprise',
  templateUrl: './edit-enterprise.component.html',
  styleUrls: ['./edit-enterprise.component.scss']
})
export class EditEnterpriseComponent implements OnInit {
  private originalData!: User;
  @Input() enterpriseData!: User;
  @Output() editUserData: EventEmitter<User> = new EventEmitter();
  @Output() deleteUser: EventEmitter<User> = new EventEmitter();

  public Cols: number = window.innerWidth <= 576 ? 1 : 2;
  public userData!: FormGroup;

  constructor(private builder: FormBuilder, private matDialog: MatDialog) { }

  handleResize(event: any){
    try{
      this.Cols = event.target.innerWidth <= 576 ? 1 : 2;
    } catch(e){}
  }

  ngOnInit(): void {
    this.userData = this.builder.group({
      displayName: [this.enterpriseData.DisplayName, [Validators.required]],
      RFC: [this.enterpriseData.RFC, [Validators.required, CustomValidators.rfc(true)]],
    });
    this.originalData = {...this.enterpriseData};
  }

  dataHasChanged(): boolean{
    if(this.originalData.DisplayName !== this.enterpriseData.DisplayName) return true;
    if(this.originalData.RFC !== this.enterpriseData.RFC) return true;
    return false;
  }

  confirmEdit(){
    if(this.userData.valid){
      this.enterpriseData.DisplayName = this.userData.controls['displayName'].value;
      this.enterpriseData.RFC = this.userData.controls['RFC'].value;

      if(this.dataHasChanged()){
        this.enterpriseData.FullName = this.enterpriseData.DisplayName;
        this.enterpriseData.BirthDate = CustomValidators.getEnterpriseCreationDate(this.enterpriseData.RFC);
        this.editUserData.emit(this.enterpriseData);
      }
    }
  }

  openDeleteDialog(){
    const data: DialogComponentData = {
      title: `¿Eliminar a ${this.enterpriseData.DisplayName} de asociados?`,
      content: 'No se eliminarán los documentos de éste, pero ya no podrá ver ni modificar sus documentos.',
      acceptText: 'Eliminar',
      cancelText: 'Cancelar',
      acceptColor: 'warn',
    }
    this.matDialog.open(DialogComponent, {data: data}).afterClosed().subscribe(accepted => {
      if(accepted){
        this.deleteUser.emit(this.enterpriseData);
      }
    });
  }
}
