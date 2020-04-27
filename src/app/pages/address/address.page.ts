import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/services/service.service";
import { AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-address",
  templateUrl: "./address.page.html",
  styleUrls: ["./address.page.scss"]
})
export class AddressPage implements OnInit {
  user: any;
  listAddress: any = [];
  id: string;
  constructor(
    public service: ServiceService,
    public alet: AlertController,
    private storage: Storage
  ) {
    this.storage.get("user").then(response => {
      this.id =  String(response.id);
      this.service.Woocommerce.getAsync(
        "customers/" +  this.id
      ).then(user => {
        this.user = JSON.parse(user.body);
      });
     
    });
  }

  ngOnInit() {}

  async setAddressShipping() {
    const alert = await this.alet.create({
      header: "Aviso",
      message: "Ecriba su dirección a continuación",
      inputs: [
        {
          name: "address",
          id: "address",
          type: "text",
          placeholder: "Escriba su dirección"
        }
      ],
      buttons: [
        {
          text: "Acceptar",
          handler: val => {
            this.setAddressStore(val);
          }
        }
      ]
    });

    await alert.present();
  }

  async setAddressPayment() {
    const alert = await this.alet.create({
      header: "Aviso",
      message: "Ecriba su dirección de Facturación",
      inputs: [
        {
          name: "address",
          id: "address",
          type: "text",
          placeholder: "Escriba su dirección"
        }
      ],
      buttons: [
        {
          text: "Acceptar",
          handler: val => {
            this.setAddressStore(val);
          }
        }
      ]
    });

    await alert.present();
  }

  async setAddressStore(val) {
    this.user.billing.address_1 = val.address;
    this.service.Woocommerce.putAsync("customers/" +  this.id, this.user).then(rest => {
      console.log(rest);
    })
    
  }
}
