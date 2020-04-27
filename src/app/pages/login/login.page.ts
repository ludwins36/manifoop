import { Component, OnInit, Inject } from "@angular/core";
// import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { Events, LoadingController, AlertController } from "@ionic/angular";
import { FormBuilder, Validators } from "@angular/forms";
import { EmailValidator } from "src/validators/email";
import { User } from "src/app/shared/user.class";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Values } from "src/app/shared/values.class";
import { ServiceService } from "src/app/services/service.service";

import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user: User = new User();
  public loginForm;
  loading: any;
  userProfile: any = null;
  disableLogin: boolean = false;
  userProfiles: any = null;
  public currentUser: any;
  require: any;

  constructor(
    // @Inject(Facebook) private fb: Facebook,
    public events: Events,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private router: Router,
    private authSvc: AuthService,
    public values: Values,
    public service: ServiceService,
    public http: HttpClient
  ) {
    this.loginForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });

    
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: "Alert",
      subHeader: "Subtitle",
      message: "This is an alert message.",
      buttons: ["OK"]
    });
    await alert.present();
  }

  async presentAlertErr() {
    const alert = await this.alertCtrl.create({
      message: "login failed!",
      buttons: [
        {
          text: "Ok",
          role: "cancel"
        }
      ]
    });
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Cargando",
      duration: 2000
    });
    return await this.loading.present();
  }

  async loginUser() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.presentLoading();

      await this.loginUsers(this.user);
    
    }
  }

  login_fb() {
    // this.authSvc.facebookLogin().then(
    //   authData => {
    //     console.log(authData);
    //     /**
  	// 	this.usersProv.getUser(authData.uid).then(data => {
  	// 		let user = {
  	// 			avt: data[0].payload.doc.data().avt,
  	// 			username: data[0].payload.doc.data().username,
  	// 			fullname: data[0].payload.doc.data().fullname,
  	// 			email: data[0].payload.doc.data().email,
  	// 			address: data[0].payload.doc.data().address,
  	// 			phone: data[0].payload.doc.data().phone,
  	// 			id: data[0].payload.doc.id,
  	// 			id_auth: data[0].payload.doc.data().id_auth
  	// 		}
  	// 		this.storage.set('user', user).then(() => {
  	// 			this.loading.dismiss().then(() => {
  	// 				this.events.publish('user: change', user);
  	// 				this.router.navigateByUrl('home');
  	// 			});
  	// 		});
  	// 	})

  	// 	*/
    //   },
    //   error => {
    //     this.loading.dismiss().then(() => {
    //       this.presentAlertErr();
    //     });
    //   }
    // );
    // this.presentLoading();
  }

  ngOnInit() {}

  async loginUsers(user: User) {
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    const userData = `username=${user.email}&password=${user.password}`;

    const url = "https://app.biciaccesorios.online";
    
    return await new Promise(() => {
      this.http
        .post<any>(`${url}/wp-json/jwt-auth/v1/token`, userData, { headers })
        .subscribe(
          res => {
            this.service.Woocommerce.getAsync(
              "customers?email=" + res.user_email
            ).then(rest => {
              let userRes = JSON.parse(rest.body);
              console.log(userRes);

              let user = {
                img : userRes[0].avatar_url,
                phone : userRes[0].billing.phone,
                cd : userRes[0].billing.postcode,
                email: userRes[0].email,
                username:userRes[0].email,
                first_name: userRes[0].first_name,
                last_name: userRes[0].last_name,
                id: userRes[0].id
              };
              this.storage.set("user", user);
              this.events.publish("user: change", user);
              this.router.navigateByUrl("/inicio");
            });
            // let user = {
            //   avt: this.userProfiles.facebook,
            //   username: this.userProfiles.displayName,
            //   fullname: this.userProfiles.lastName,
            //   email: this.userProfiles.email,
            //   address: this.userProfiles.address,
            //   phone: this.userProfiles.phone,
            //   id: this.currentUser.uid
            // };

            // this.storage.set("user", user);
            // this.storage.set("cart_list", []);

            // this.events.publish("user: change", user);
            // //	console.log(data);
            // this.router.navigateByUrl("/inicio");
          },
          err => {
            console.log(err.error.code);
          }
        );
    });
  }
}
