import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  }
  public post<T>(url: string, data: any, options?: any): Observable<T> {
    return this.http.post<T>(
      this.baseUrl + url,
      data,
      options
    ) as unknown as Observable<T>;
  }
  public put<T>(url: string, data: any, options?: any) {
    return this.http.put<T>(this.baseUrl + url, data, options);
  }
  public delete<T>(url: string, options?: any) {
    return this.http.delete<T>(this.baseUrl + url, options);
  }
}
