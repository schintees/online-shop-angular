import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../modules/shared/types/products.types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + '/products');
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.API_URL + `/products/${id}`)
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(this.API_URL + `/products/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL + '/products', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.API_URL + `/products/${product.id}`, product);
  }

}
