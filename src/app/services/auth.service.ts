import { Injectable } from "@angular/core";
import { User } from "../shared/user.class";
// import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ServiceService } from "./service.service";
import { resolve } from "url";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public isLoggerd: any = false;
  public restaurantUserInfo: any;

  constructor(
    public service: ServiceService,
    // private facebook: Facebook,
    public http: HttpClient
  ) {
  }

 

  // register
  

  facebookLogin() {
    
  }

  createUser(user: User) {
    const data = {
      email: user.email,
      first_name: user.firstname,
      last_name: user.lastname,
      password: user.password
    };

    return this.service.Woocommerce.postAsync("customers", data)
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => {
        console.log(error);
      });

    return new Promise((resolve, reject) => {
      this.service.Woocommerce.postAsync("customers", data)
      .then(
        res => {
          resolve(res);
        },
        error => {
          resolve(error);
        }
      );
      // .subscribe(customerData => {

      //   resolve(customerData);
    });
  }
}
