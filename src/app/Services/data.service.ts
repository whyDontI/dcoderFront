import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Thread } from '../models/thread';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  env = environment;
  email = JSON.parse(localStorage.getItem('currentUserEmail'));

  constructor(private http: HttpClient) { }

    getAllThreads() {
        let email = this.email;
        return this.http.get<Thread[]>(`${this.env.apiUrl}/thread/` + email);
    }

    getOneThread(id){
      return this.http.get<Thread>(`${this.env.apiUrl}/thread/` + id);
    }

    addNewThread(title: string, description: string, tags: Array<string>){
      let email = this.email;
      return this.http.post<any>(`${this.env.apiUrl}/thread`, {title, description, tags, email})
            .pipe(map(data => {
                // Register successful if there's a message in response
                if (data.message) {
                    console.log(data.message);  
                }
                return data;
            }));
    }

}
