import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { TokenResponse } from '../Interface/Interface';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserRoleListComponent } from '../components/user-role/user-role-list/user-role-list.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  timestamp!: string;
  dateofbirth!: string;
  monthseperator!: string;
  dayseperator!: string;
  expToken: any;
  tokenPayload: any;
  expirationDate: any;


  constructor(private http: HttpClient, private router: Router,private jwtHelper: JwtHelperService ) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse
        (localStorage.getItem('currentUser')!));
      this.currentUser = this.currentUserSubject.asObservable();


  }

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json',
     'Authorization': 'jwt-token' ,
     'Access-Control-Allow-Origin': '*'

    }),


  };


  public get currentUserValue(): User {
    return this.currentUserSubject.value;


}




login(userEmail: string, userPassword: string): Observable<TokenResponse> {

  console.log('hit here')
  return this.http.post(`${environment.apiUrl}/Login/`, {userEmail,userPassword},{responseType: 'text'})
  .pipe(map(data => {

    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(data))

   console.log(this.tokenPayload);

   let tokenResponse: TokenResponse = {UserFirstName : this.tokenPayload[0],
    UserID:this.tokenPayload[1],UserRole: this.tokenPayload[2],accessToken : data,refreshToken: 'refreshtoken'


   }

    this.saveSession(tokenResponse);

    return tokenResponse;

  }));
}
saveSession(tokenResponse: TokenResponse) {

  window.localStorage.setItem('AT', tokenResponse.accessToken);
  window.localStorage.setItem('RT', tokenResponse.refreshToken);

  if (tokenResponse.UserID) {
    window.localStorage.setItem('ID', tokenResponse.UserID.toString());
    window.localStorage.setItem('FN', tokenResponse.UserFirstName);
    window.localStorage.setItem('RL', tokenResponse.UserRole);
  }

}
refreshToken(session: TokenResponse) {
  let refreshTokenRequest: any = {
    UserId: session.UserID,
    RefreshToken: session.refreshToken
  };
  return this.http.post<TokenResponse>(`${environment.apiUrl}/Login/`, refreshTokenRequest);
}

GetTokenDecoded(token:any) {
  console.log(this.jwtHelper.decodeToken(token))
  this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(token));
}
getTokenExpirationDate() {
  this.expirationDate = this.jwtHelper.getTokenExpirationDate(this.expToken);
}
isAuthenticated(): boolean {
  return !this.jwtHelper.isTokenExpired(this.expToken);
}
logout() {
  // remove user from local storage to log user out
  localStorage.clear();
 this.router.navigate(['/component/login']);
}
register(user:any) {

  console.table(user);

    this.timestamp = user.timestamp + '.098Z';

    if (user.UserDOB.month > 9) {
      this.monthseperator = '-';
    } else {
      this.monthseperator = '-0';
    }

    if (user.UserDOB.day > 9) {
      this.dayseperator = '-';
    } else {
      this.dayseperator = '-0';
    }

    this.dateofbirth =
      user.UserDOB.year +
      this.monthseperator +
      user.UserDOB.month +
      this.dayseperator +
      user.UserDOB.day +
      'T00:00:00.000Z';

 user = {
  userID: 0,
  userFirstName : user.UserFirstName,
  userLastName: user.UserLastName,
  userEmail: user.UserEmail,
  userPhoneNumber: user.UserPhoneNumber,
  userPassword: user.UserPassword,
  userDOB: this.dateofbirth,
  userAddressLine1: user.UserAddressLine1,
  userAddressLine2: user.UserAddressLine2,
  userPostalCode: user.UserPostalCode,
  userRole: {
    userRole_Id: user.userRole_Id
  },
  suburbID: user.SuburbId,
  isVerified: true,
  timestamp: this.timestamp
};


  return this.http.post(`${environment.apiUrl}/usercontroler`, user);
}

getAll() {
  return this.http.get<User[]>(`${environment.apiUrl}/users`);
}

getById(id: string) {
  return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
}

update(id:any, params:any) {
  return this.http.put(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
          // update stored user if the logged in user updated their own record
          if (id == this.currentUserValue.UserID) {
              // update local storage
              const user = { ...this.currentUserValue, ...params };
              localStorage.setItem('user', JSON.stringify(user));

              // publish updated user to subscribers
              this.currentUserSubject.next(user);
          }
          return x;
      }));
}

delete(id: string) {
  return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
          // auto logout if the logged in user deleted their own record
          if (id == this.currentUserValue.UserID) {
              this.logout();
          }
          return x;
      }));
}

}
