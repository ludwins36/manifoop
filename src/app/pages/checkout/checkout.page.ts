import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { LoadingController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ServiceService } from "src/app/services/service.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.page.html",
  styleUrls: ["./checkout.page.scss"]
})
export class CheckoutPage implements OnInit {
  payments: any;
  comment: any;
  idPayment: any;
  paymentName: any;
  price: any;
  quantity: any;
  productId: any;
  userData: any;
  loading: any;
  adicionalList: any = [];

  constructor(
    private storage: Storage,
    public service: ServiceService,
    public alet: AlertController,
    public loadingCtrl: LoadingController,
    public routeActive: Router
  ) {}

  ngOnInit() {
    this.storage.get("cart_list").then(response => {
      console.log(response);
      this.price = response.price;
      (this.productId = response.id), (this.quantity = response.quantity);
    });

    this.storage.get("adisional_list").then(response => {
      console.log(response);
      this.adicionalList = response;
    });

    this.storage.get("comment").then(response => {
      console.log(response);
      this.comment = response;
    });

    this.storage.get("payment_metod").then(rest => {
      this.paymentName = rest.name;
      this.idPayment = rest.id;
    });

    this.storage.get("user").then(response => {
      this.userData = response;
    });
  }

  

  createOrder() {
    this.getLoading();
    let addicionales = [];

    let product = {
      product_id: parseInt(this.productId),
      quantity: parseInt(this.quantity)
    };

    addicionales.push(product);

    this.adicionalList.forEach(add => {
      let addA = {
        product_id: add.id,
        quantity: add.quantity
      };
      addicionales.push(addA);
    });

    let data = {
      payment_metod: this.idPayment,
      payment_metod_title: this.paymentName,
      set_paid: true,
      customer_id : this.userData.id,
      billing: {
        first_name: this.userData.username,
        last_name: this.userData.fullname,
        address_1: this.userData.address,
        address_2: "",
        city: "cartagena",
        state: "CA",
        postcode: "95452",
        country: "CO",
        email: this.userData.email,
        phone: String(this.userData.phone)
      },
      shipping: {
        first_name: this.userData.username,
        last_name: this.userData.fullname,
        address_1: this.userData.address,
        address_2: "",
        city: "cartagena",
        state: "CA",
        postcode: "95452",
        country: "CO"
      },
      line_items: addicionales
    };

    this.service.Woocommerce.postAsync("orders", data)
      .then(response => {
        let res = JSON.parse(response.body);
        if (res.id > 0) {
          this.getAlert("Pedido creado correctamente");
          this.service.Woocommerce.postAsync("orders/" + res.id + "/notes", {
            note: this.comment
          }).then(rest => {
            console.log(JSON.parse(rest.body));
          });
        }

        console.log(JSON.parse(response.body));
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Cargando",
      duration: 2000
    });

    await this.loading.present();
  }

  async getAlert(message) {
    const alert = await this.alet.create({
      header: "Alerta",
      subHeader: "Información de pedido",
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
}
