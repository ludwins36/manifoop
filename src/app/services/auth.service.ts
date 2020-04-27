import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
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
    public afAuth: AngularFireAuth,
    public service: ServiceService,
    // private facebook: Facebook,
    public http: HttpClient
  ) {
    afAuth.authState.subscribe(user => (this.isLoggerd = user));
  }

  // login
  async onLogin(user: User) {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (e) {
      console.log(e);
    }
  }

  // register
  async onRegister(user: User) {
    try {
      return await this.afAuth.auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(newUser => {
          this.restaurantUserInfo.child(newUser.user.uid).set({
            email: user.email,
            displayName: user.firstname,
            lastName: user.lastname,
            address: user.address,
            phone: user.phone,
            facebook: false
          });
        });
    } catch (e) {
      console.log("Error en registro ", e);
    }
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

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
