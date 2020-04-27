import { Injectable } from "@angular/core";
import { Crop } from "@ionic-native/crop/ngx";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { async } from "rxjs/internal/scheduler/async";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { ServiceService } from "./service.service";
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: "root"
})
export class ImageService {
  constructor(
    private  imagePicker: ImagePicker,
    private  cropService: Crop,
    private  webView: WebView,
    private  toastCtrl: ToastController,
    private  service: ServiceService
  ) {}

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
                  // this.uploadImageToFirebase(results[i]);
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

  uploadImageToFirebase(image) {
    image = this.webView.convertFileSrc(image);

    //uploads img to firebase storage
    // this.service.uploadImage(image).then(photoURL => {
    //   let toast = this.toastCtrl.create({
    //     message: "Image was updated successfully",
    //     duration: 3000
    //   });
    //   toast.then(rest => {
    //     console.log(rest);
    //   });
    // });
  }
}
