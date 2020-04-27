import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AlertController, Events } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ServiceService } from "src/app/services/service.service";
import { CacheService } from "ionic-cache";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.page.html",
  styleUrls: ["./product-detail.page.scss"]
})
export class ProductDetailPage implements OnInit {
  img: any;
  id: any;
  price: any;
  title: any;
  description: any;
  value: number = 1;
  listProducParams: any = [];
  listBebidas: any = [];
  listAdicionales: any = [];
  total: any;
  coment: any;

  constructor(
    private route: ActivatedRoute,
    public alet: AlertController,
    private storage: Storage,
    private cache: CacheService,
    public service: ServiceService,
    public events: Events,
    public routeActive: Router
  ) {
    this.route.params.subscribe(params => {
      this.img = params.img;
      this.id = params.proId;
      (this.title = params.title),
        (this.description = params.description),
        (this.price = params.price);
    });
  }

  async addCart() {
    this.events.publish("adisional_list: change", this.listProducParams);
    this.storage.set("adisional_list", this.listProducParams);
    this.storage.set("comment", this.coment);
  }

  add() {
    this.value = Number(this.value) + 1;
    this.total = Number(this.total) + Number(this.price);
  }

  async getIdCategoryBebidas() {
    return await this.service.Woocommerce.getAsync(
      "products/categories?slug=bebidas"
    ).then(catSecon => {
      let data = JSON.parse(catSecon.body);
      return data[0].id;
    });
  }

  async getIdCategoryAdicionales() {
    return await this.service.Woocommerce.getAsync(
      "products/categories?slug=adicionales"
    ).then(catSecon => {
      let data = JSON.parse(catSecon.body);
      return data[0].id;
    });
  }

  async loadCategory(id) {
    return await this.service.Woocommerce.getAsync(
      "products?category=" + id
    ).then(catSecon => {
      return JSON.parse(catSecon.body);
    });
  }

  addBebida(check, product) {
    if (!check) {
      let itemCv = {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        // discount: item.payload.doc.data().discount,
        description: product.description,
        // id_cat: item.payload.doc.data().id_cat,
        quantity: 1
      };
      this.listProducParams.push(itemCv);
      this.total = Number(this.total) + Number(product.price);
    } else {
      let index = this.listProducParams.indexOf(
        this.listProducParams.find(x => x.id == product.id)
      );
      this.listProducParams.splice(index, 1);
      this.total -= Number(product.price);
    }
    console.log(this.listProducParams);
  }

  remove() {
    if (this.value > 1) {
      this.value -= 1;
      this.total -= this.price;
    }
  }

  async ngOnInit() {
    this.total = this.price;
    let idBebidas = await this.cache.getOrSetItem(
      this.service.keyBebidas,
      () => this.getIdCategoryBebidas(),
      this.service.keyGroup
    );
    let idAdicionales = await this.cache.getOrSetItem(
      this.service.keyAdicionales,
      () => this.getIdCategoryAdicionales(),
      this.service.keyGroup
    );
    this.listBebidas = await this.cache.getOrSetItem(
      String(idBebidas),
      () => this.loadCategory(String(idBebidas)),
      this.service.keyGroup
    );
    this.listAdicionales = await this.cache.getOrSetItem(
      String(idAdicionales),
      () => this.loadCategory(String(idAdicionales)),
      this.service.keyGroup
    );
  }
}
