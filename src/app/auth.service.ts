import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiEndpoint = "http://localhost:3030/api/v1"
  constructor(private http: HttpClient) { }

  login(username: string, password: string)
  {
    return this.http.post<any>(this.apiEndpoint + "/login", {username, password})
  }
}
