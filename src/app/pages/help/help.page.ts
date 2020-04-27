import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-help",
  templateUrl: "./help.page.html",
  styleUrls: ["./help.page.scss"]
})
export class HelpPage implements OnInit {
  loading: any;

  constructor(
    public loadingCtrl: LoadingController,
    public routeActive: Router,
    public alet: AlertController
  ) {}

  ngOnInit() {}

  async createTicket() {
    this.getLoading();
    this.getAlert();
  }

  async getLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Cargando",
      duration: 800
    });

    await this.loading.present();
  }

  async getAlert() {
    const alert = await this.alet.create({
      header: "Exito",
      subHeader: "El mensaje se envío corectamente.",
      message: "Nos contactaremos lo mas pronto posible.",
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
}
