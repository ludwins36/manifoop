import { Component, OnInit, Inject } from "@angular/core";
import {
  Events,
  ToastController,
  NavController,
  LoadingController,
} from "@ionic/angular";
import { ServiceService } from "src/app/services/service.service";
import { Values } from "src/app/shared/values.class";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { CacheService } from "ionic-cache";
import { CacheServicesService } from "src/app/services/cache-services.service";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  list_product: any;
  list_product_new: any;
  list_product_slide: any;
  loading: any;
  start: any;
  id_user: any;
  favo_str: string = "";
  id_favo_str: any;
  list_cart: Array<any>;
  promosList = [];
  featuredList = [];
  shops: any = [];
  catg: any;

  userProfiles: any;
  currentUser: any;

  constructor(
    public events: Events,
    public toastCtrl: ToastController,
    private storage: Storage,
    public navCtrl: NavController,
    public service: ServiceService,
    public loadingCtrl: LoadingController,
    public values: Values,
    public router: Router,
    private cache: CacheService,
    private cacheService: CacheServicesService
  ) {
    // this.cache.clearAll();
    this.presentLoading();

    this.cacheService.getRestourans().then((shops) => {
      console.log(shops);
      this.shops = shops;
    });
    this.service.Woocommerce.getAsync("payment_gateways").then((response) => {
      let paymentName;
      let idPayment;
      let payments = JSON.parse(response.body);

      payments.forEach((pay) => {
        if (pay.enabled == true) {
          paymentName = pay.title;
          idPayment = pay.id;
        }
      });
      let data = {
        name: paymentName,
        id: idPayment,
      };

      this.storage.set("payment_metod", data);
    });

    this.events.subscribe("cart_list: change", (lst) => {
      this.list_cart = lst;
    });

    this.events.subscribe("user: change", (user) => {
      if (user || user != null) {
        this.id_user = user.uid;
      }
    });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Cargando",
      duration: 1000,
    });
    return await this.loading.present();
  }

  async ngOnInit() {
    this.promosList = await this.cacheService.getProductPromos();
    this.featuredList = await this.cacheService.getFeaturedProduct();
  }

  doRefresh(event) {
    this.cache.clearGroup(this.service.keyGroup);
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter() {}
}
