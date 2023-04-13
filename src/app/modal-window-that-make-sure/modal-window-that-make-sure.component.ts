import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-window-that-make-sure',
  templateUrl: './modal-window-that-make-sure.component.html',
  styleUrls: ['./modal-window-that-make-sure.component.css']
})
export class ModalWindowThatMakeSureComponent implements OnInit{
  idFromOrderTable: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)public data:any,
    private _refConfirmedDialog: MatDialogRef<ModalWindowThatMakeSureComponent>
  ){}
  ngOnInit(){
    this.idFromOrderTable = this.data;
  }
  delitionOrder(){
    this._refConfirmedDialog.close(this.idFromOrderTable);
  }

}
