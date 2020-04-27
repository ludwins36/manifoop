import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { EmailValidator } from "src/validators/email";
import { User } from "src/app/shared/user.class";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { AuthService } from "../../services/auth.service";
import { LoadingController, Events, AlertController } from "@ionic/angular";
import { ServiceService } from "src/app/services/service.service";
import { HttpResponse, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  user: User = new User();
  public signupForm;
  loading: any;

  public currentUser: any;
  public userProfiles: any;

  constructor(
    public formBuilder: FormBuilder,
    private authSvc: AuthService,
    public serviceProv: ServiceService,
    private router: Router,
    public alet: AlertController,
    public storage: Storage,
    public events: Events,
    public loadingCtrl: LoadingController
  ) {
    this.signupForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      firstname: [
        "",
        Validators.compose([Validators.minLength(3), Validators.required])
      ],
      lastname: [
        "",
        Validators.compose([Validators.minLength(4), Validators.required])
      ],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  ngOnInit() {}

  async onRegister() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.presentLoading();
      await this.authSvc.onRegister(this.user).then(() => {
        authData => {
          console.log(authData);
        };

        this.serviceProv
          .getRestaurantUserProfile(this.currentUser.uid)
          .on("value", snapshot => {
            console.log(snapshot.val());

            this.userProfiles = snapshot.val();

            console.log(this.userProfiles);

            this.loading.dismiss().then(() => {
              let user = {
                avt: this.userProfiles.facebook,
                username: this.userProfiles.displayName,
                fullname: this.userProfiles.lastName,
                email: this.userProfiles.email,
                address: this.userProfiles.address,
                phone: this.userProfiles.phone,
                id: this.currentUser.uid
              };
              this.storage.set("user", user);
              this.events.publish("user: change", user);
              //	console.log(data);
              this.router.navigateByUrl("/inicio");
            });
          });
      });
    }
  }

  async getAlert(message) {
    const alert = await this.alet.create({
      header: "Alerta",
      message: message,
      buttons: [
        {
          text: "Aceptar",
         
        }
      ]
    });

    await alert.present();
  }

  async onRegisterWoo() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.presentLoading();
      let data = {
        email: this.user.email,
        username: this.user.email,
        first_name: this.user.firstname,
        last_name: this.user.lastname,
        doc : '0000000',
        sexo : "m",
        phone : "0000000000"

      };
      
      await this.serviceProv.Woocommerce.postAsync("customers", data)
      .then(async response => {
        console.log(response);
        let user  = JSON.parse(response.body);        
        if(user.code){
          await this.getAlert(user.message);
        }else{
          data['id'] = user.id;
          this.storage.set("user", data);
          this.events.publish("user: change", data);
          this.router.navigateByUrl("/inicio");

        }

      })

      .catch(error => {
        console.log(error);
      });


    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Cargando",
      duration: 2000
    });
    return await this.loading.present();
  }
}
