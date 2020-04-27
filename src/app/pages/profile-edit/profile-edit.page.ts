import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { Crop } from "@ionic-native/crop/ngx";
import {
  NavController,
  ToastController,
  AlertController
} from "@ionic/angular";
import { async } from "rxjs/internal/scheduler/async";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { ServiceService } from "src/app/services/service.service";
import { User } from "src/app/shared/user.class";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.page.html",
  styleUrls: ["./profile-edit.page.scss"]
})
export class ProfileEditPage implements OnInit {
  img: any;
  user: any;
  userCustom: User = new User();
  constructor(
    private storage: Storage,
    public imagePicker: ImagePicker,
    public cropService: Crop,
    public navCtrl: NavController,
    public webView: WebView,
    public toastCtrl: ToastController,
    public service: ServiceService,
    public alet: AlertController,
    public routeActive: Router
  ) {
    this.storage.get("user").then(response => {
      console.log(response);
      this.user = response;
      this.img = response.img;
      this.userCustom.lastname = response.last_name;
      this.userCustom.firstname = response.first_name;
      this.userCustom.email = response.email;
    });
  }

  ngOnInit() {}

  openImagePicker() {
    this.imagePicker.hasReadPermission().then(
      result => {
        if (result == false) {
          // no callbacks required as this opens a popup which returns
          async;
          this.imagePicker.requestReadPermission();
        } else if (result == true) {
          this.imagePicker
            .getPictures({
              maximumImagesCount: 1
            })
            .then(
              results => {
                for (var i = 0; i < results.length; i++) {
                  this.uploadImageToFirebase(results[i]);
                }
              },
              err => console.log(err)
            );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  update() {
    this.getAlert("Información actualizada");
  }

  async getAlert(message) {
    const alert = await this.alet.create({
      header: "Alerta",
      subHeader: "Información",
      message: message,
      buttons: [
        {
          text: "Aceptar",
          handler: () => {
            this.routeActive.navigate(["/inicio"]);
          }
        }
      ]
    });

    await alert.present();
  }

  uploadImageToFirebase(image) {
    image = this.webView.convertFileSrc(image);

    //uploads img to firebase storage
    // this.service.uploadImage(image).then(photoURL => {
    //   alert(photoURL);
    // });
  }
}
