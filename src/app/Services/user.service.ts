import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../../UserEvents/src/app/Model/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  apiUrl: string = "http://localhost:7071/api/users/";
  options: any = { hour12: false }

  getAllUsers(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl);
  }

  LoadUserToEdit(userId: string): Observable<User[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any>(this.apiUrl + 'details/?id=' + userId);
  }

  getUserEvents(lastUpdatedTime: any) {
    var time = lastUpdatedTime;
    // var time = lastUpdatedTime.toLocaleString('en-US', this.options);
    return this.http.get(this.apiUrl + "getEvents?time=" + time + "&collection=" + "User");
  }

  CreateUser(formdata: any): any {
    console.log("Create User" + formdata.modifiedDate);

    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.apiUrl + "insert", formdata);
  }

  UpdateUser(formdata: any): any {
    return this.http.put(this.apiUrl + "update", formdata);
  }

  DeleteUser(userId: string): any {
    var time = new Date;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.http.delete(this.apiUrl + "delete?userId=" + userId + "&modifiedDate=" + new Date().toLocaleString('en-US', { hour12: false }),
    return this.http.delete(this.apiUrl + "delete?userId=" + userId + "&modifiedDate=" + time.toISOString(),
      httpOptions);
  }
}
