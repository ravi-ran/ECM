import { Injectable } from '@angular/core';
import { LoginData, Manager } from '@components/welcome-screen/welcome-screen.component';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import * as config from '@config/config.json';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  public isLoggedIn: boolean;
  
  constructor(private http: HttpClient) { }

  login(loginObj: LoginData) {
    return this.http.post(environment.host + config.managerLogin, loginObj);
  }

  addNewManager(managerObj: Manager) {
    return this.http.post(environment.host + config.addNewManager, managerObj);
  }


}
