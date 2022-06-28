import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProductService } from 'src/app/services/product.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})




export class ProductosComponent implements OnInit {
  // nameColumns: string [] = ['CODIGO DE BARRAS', 'NOMBRE', 'DESCRIPCION', 'EXISTENCIA', 'PRECIO']
  displayedColumn: string[] = ['codigo', 'nombre', 'descripcion', 'existencia','pventa'];
  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'existencia','pventa', 'acciones'];

  dataSource: any = new MatTableDataSource;

  expandedElement: any | null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor( private _productService: ProductService,
              //
              ) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  openModal() {
    // const dialogRef = this.dialog.open(D)
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  getProducts() {
    this._productService.getProducts().subscribe( data => {
      console.log(data);
      this.dataSource = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  getProduct(dataSource: any) {
    // console.log(dataSource);
    this._productService.getProduct(dataSource.IDPRODUCTO)
      .subscribe( data => {
        console.log(data);
      })
  }

}
