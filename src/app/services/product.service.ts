import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private Url = 'https://localhost:44319/api/';
  private rute ="Producto";



  constructor(private httpClient: HttpClient) { }

  getProduct(id: string): Observable<any> {
    return this.httpClient.get<any>(this.Url+''+this.rute+`/Get/`+ id);
  }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.Url+''+this.rute+`/GetAll`);
  }
}
