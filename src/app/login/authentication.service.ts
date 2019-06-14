import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../login/user';
import { config } from '../Common/config';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

objConfig:config
public user : User;
//apiURL = this.objConfig.apiURL;
apiURL = 'https://local-poc.najm.sa/api/v1';

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.user=new User();
    }
    // Http Options
httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
};

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
   
    login(username: string, password: string)  {
       if(username=='dev@clarion.com' && password=='Clarion123')
       {
        this.user.firstName='admin' ;
        this.user.id=1;
        this.user.password='admin';
        this.user.token='admin';
        this.user.username='admin';
           // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('currentUser', JSON.stringify(this.user));
         this.currentUserSubject.next(this.user);
        return this.user;
       }
       else if(username=='admin@clarion.com' && password=='Clarion123')
       {
        this.user.firstName='admin' ;
        this.user.id=1;
        this.user.password='admin';
        this.user.token='admin';
        this.user.username='admin';
        localStorage.setItem('currentUser', JSON.stringify(this.user));
         this.currentUserSubject.next(this.user);
        return this.user;
       }
       else
       {
        return this.user;
       }
        // return this.http.post<any>(this.apiURL +'/user', { username:username, password:password },this.httpOptions)
        //     .pipe(map(user => {
        //         // login successful if there's a jwt token in the response
        //         if (user && user.token) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //             this.currentUserSubject.next(user);
        //         }
        //         return user;
        //     }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}