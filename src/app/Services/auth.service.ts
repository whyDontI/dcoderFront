import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { Data } from '../models/data';
import { environment } from '../../environments/environment';
import { Thread } from '../models/thread';


@Injectable({ providedIn: 'root' })

export class AuthService {
    env = environment;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        // return this.http.post<any>(`${this.env.apiUrl}/users/login`, { email, password })

        return this.http.post<any>(`${this.env.apiUrl}/users/login`, { email, password })
            .pipe(map(data => {
                // login successful if there's a jwt token in the response
                if (data.message && data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(data.token));
                    localStorage.setItem('currentUserEmail', JSON.stringify(data.email));
                    this.currentUserSubject.next(data);
                }

                return data;
            }));

    }

    register(email: string, password: string, password2: string) {
        return this.http.post<any>(`${this.env.apiUrl}/users/register`, {email, password, password2})
            .pipe(map(data => {
                // Register successful if there's a message in response
                if (data.message) {
                    console.log(data.message);
                }
                return data;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
