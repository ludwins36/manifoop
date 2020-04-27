import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ActivatedRoute, Router } from "@angular/router";
import { Events, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"]
})
export class CartPage implements OnInit {
  cartData: any;
  dataServives: any;
  total: any;
  title: any;
  value: number;
  price: any;
  quanty: any;
  loading: any;
  id: any;
  description: any;

  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public events: Events,
    public routeActive: Router
  ) {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.quanty = params.quanty;
      this.title = params.title;
      (this.description = params.description), (this.price = params.price);
    });
  }

  add() {
    this.value = Number(this.value) + 1;
    this.total = Number(this.total) + Number(this.price);
  }

  remove() {
    if (this.value > 1) {
      this.value -= 1;
      this.total = Number(this.total) - Number(this.price);
    }
  }

  async clearCart() {
    await this.presentLoading();
    this.storage.remove("cart_list");
    this.storage.remove("adisional_list");
    this.routeActive.navigate(["/inicio"]);

  }

  async addCart() {
    let itemCv = {
      id: this.id,
      name: this.title,
      price: this.total,
      // discount: item.payload.doc.data().discount,
      description: this.description,
      // id_cat: item.payload.doc.data().id_cat,
      quantity: this.value
    };

    this.events.publish("cart_list: change", itemCv);
    // if(this.storage.get("cart_list"))
    this.storage.set("cart_list", itemCv);
    this.routeActive.navigate(["/checkout"]);

    // const alert = await this.alet.create({
    //   header: "Aviso",
    //   subHeader: "Productos agregados al carrito",
    //   message: "desea pagar o seguir comprando.",
    //   buttons: [
    //     {
    //       text: "Seguir comprando",
    //       handler: () => {
    //         this.routeActive.navigate(["/inicio"]);
    //       }
    //     },
    //     {
    //       text: "Finalizar compra",
    //       handler: () => {
    //         this.routeActive.navigate(["/cart"]);

    //       }
    //     }
    //   ]
    // });

    // await alert.present();
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Cargando",
      duration: 1000
    });
    return await this.loading.present();
  }

  ngOnInit() {
    this.total = this.price;
    this.value = this.quanty;
    
  }
}
