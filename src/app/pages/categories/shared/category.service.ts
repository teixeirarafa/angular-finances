import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Category } from "./category.model";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private apiPath: string = "api/categories";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.apiPath)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get<Category>(url).pipe(catchError(this.handleError));
  }

  create(category: Category): Observable<Category> {
    return this.http
      .post<Category>(this.apiPath, category)
      .pipe(catchError(this.handleError));
  }

  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;
    return this.http
      .put<Category>(url, category)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.log("Erro na requisição: ", error);
    return throwError(error);
  }
}
