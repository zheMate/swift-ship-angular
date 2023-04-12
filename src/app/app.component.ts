import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderModalAddAndEditComponent } from './order-modal-add-and-edit/order-modal-add-and-edit.component';
import { OrderService } from './services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {


  displayedColumns: string[] = ['id',
    'firstName',
    'lastName',
    'gender',
    'email',
    'phone',
    'departureDate',
    'citiesAndDistrictFilter',
    'recieveAddress',
    'shippingCompanies',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _orderService: OrderService,
    private _coreService: CoreService,
    
    ) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  openAddOrEditOrderModalForm(data: any, editable: boolean){
    if(editable){
      const dialogRef = this._dialog.open(OrderModalAddAndEditComponent, {
        data,
     });
     dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getOrderList();
        }
      }
    })
    }
    else {
      const dialogRef =  this._dialog.open(OrderModalAddAndEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if(val) {
            this.getOrderList();
          }
        }
      })
    }
  }

  getOrderList() {
    this._orderService.getOrderList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteOrder(id: number){
    this._orderService.deleteOrder(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Заказ удалён !', 'Выполнено');
        this.getOrderList();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
